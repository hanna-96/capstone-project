var AWS = require("aws-sdk");
const {accessKeyId,secretAccessKey} = require('../secrets')
let awsConfig = {
  region: "us-east-2",
  endpoint: "http://dynamodb.us-east-2.amazonaws.com",
  accessKeyId,
  secretAccessKey
};
AWS.config.update(awsConfig);

const DynamoDB = new AWS.DynamoDB();

async function createTable() {
  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
      // { AttributeName: "userName", KeyType: "HASH" },
      // { AttributeName: "firstName", KeyType: "HASH" },
      // { AttributeName: "lastName", KeyType: "HASH" },
      // { AttributeName: "email", KeyType: "HASH" },
      // { AttributeName: "password", KeyType: "HASH" },
      // { AttributeName: "cabinet", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
      // { AttributeName: "userName", AttributeType: "S" },
      // { AttributeName: "firstName", AttributeType: "S" },
      // { AttributeName: "lastName", AttributeType: "S" },
      // { AttributeName: "email", AttributeType: "S" },
      // { AttributeName: "password", AttributeType: "S" },
      // { AttributeName: "cabinet", AttributeType: "M" }, // M=object ; L= array;what is better
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  return await DynamoDB.createTable(params).promise();
}
// (async ()=>{
//   console.log('the func call', await createTable());
// })()

async function addItem(id, userName, firstName, lastName, ingredient) {
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

(async () => {
    console.log(
        "the func call",
        await addItem(
            "2",
            "anna_96",
            "Anna",
            "Rzh",
            [{name: 'vodka', image: "bhfbejcnej"}, {name: 'rum', image: "bhfbejcnej"}, {name: 'rum',image:"bhfbejcnej"}]
            )
            );
        })();
                                                //   M: { 
                                                
                                                //     name: { S: ingredient[0].name},
                                                //     image: {S: ingredient[0].image}
                                                //   }