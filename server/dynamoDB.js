const AWS = require("aws-sdk");
require('../secrets')
const awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);

const DynamoDB = new AWS.DynamoDB();

async function createTable() {
  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  return await DynamoDB.createTable(params).promise();
}

async function addUser(id, userName, firstName, lastName, ingredient) {
  const params = {
    TableName: "Users",
    Item: {
      id: { N: id },
      userName: { S: userName },
      firstName: { S: firstName },
      lastName: { S: lastName },
      ingredients: {
          L: //L -array
                    ingredient.map(item => {
                        return {
                            M: {
                                  name: {S: item.name},
                                  image: {S: item.image}
                            }
                        }
                    }
                  )
                }
    },
  };
  
  return await DynamoDB.putItem(params).promise();
}

// (async () => {
//     console.log(
//         "the func call",
//         await addUser(
//             "3",
//             "sasachop",
//             "Anna",
//             "Rzh",
//             [{name: 'vodka', image: "bhfbejcnej"}, {name: 'rum', image: "bhfbejcnej"}, {name: 'rum',image:"bhfbejcnej"}]
//             )
//             );
//         })();
//get allusers query
        async function getAllUsers() {
          const params = {
            TableName: "Users",
          };
          return await DynamoDB.scan(params).promise();
        }
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();
//get single user 
        async function getSingleUser(id,ingredientName) {
          const params = {
            TableName: "Users",
            Key: {
              id: { N: id },
              // ingredient:{}
            },
          };
          return await DynamoDB.getItem(params).promise();
        }
        (async () => {
          const user = await getSingleUser("2")
          const ingredients = user.Item.ingredients.L;
          console.log(
            "the func worked ",
            ingredients
          );
        })();
