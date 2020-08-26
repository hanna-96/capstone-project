const AWS = require("aws-sdk");
if (process.env.NODE_ENV === 'dev') require('../secrets')
const awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY
};
AWS.config.update(awsConfig);
//conecting to AWS DynamoDB
const DynamoDB = new AWS.DynamoDB();
const DocumentClient = new AWS.DynamoDB.DocumentClient();
//creating table
async function createTable() {
  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: "userId", KeyType: "HASH" },
      // { AttributeName: "ingredientId", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "N" },
      // { AttributeName: "ingredientId", AttributeType: "N" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3,
    },
  };
  return await DynamoDB.createTable(params).promise();
}
// (async ()=>{
//   console.log('the func worked', await createTable());
// })()

//adding an item to the table(User)
// async function addUser(id, userName, firstName, lastName, ingredient) {
//   const params = {
//     TableName: "Users",
//     Item: {
//       userId: { N: id },
//       userName: { S: userName },
//       firstName: { S: firstName },
//       lastName: { S: lastName },
//       ingredients: {
//         //L -array
//         L: ingredient.map((item) => {
//           return {
//             M: {
//               name: { S: item.name },
//               image: { S: item.image },
//             },
//           };
//         }),
//       },
//     },
//   };

//   return await DynamoDB.putItem(params).promise();
// }
//WHEN ADDING A NEW USER WE DON'T NEED TO SPECIFY INGREDIENT
async function addUser(id, userName, firstName, lastName,ingredient = '') {
  const params = {
    TableName: "Users",
    Item: {
      userId: id,
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      ingredients: [ingredient],
      // //L -array
      //  ingredient.map((item) => {
      //   return {
      //       name:item.name,
      //       image:item.image,

      //   };
      // }),
    },
  };

  return await DocumentClient.put(params).promise();
}
// (async () => {
//     console.log(
//         "the func worked",
//         await addUser(
//             3,
//             "irina_bareto",
//             "Irina",
//             "Bareto",
//             )
//             );
//         })();
// get allUsers (!!!expensive operation!!!)
async function getAllUsers() {
  const params = {
    TableName: "Users",
  };
  return await DocumentClient.scan(params).promise();
}
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();

//get single user
async function getSingleUser(id) {
  const params = {
    TableName: "Users",
    Key: {
      // userId: { N: id },
      userId: id,
      // ingredientId: ingredientId,
    },
  };
  return await DocumentClient.get(params).promise();
}
// (async () => {
//   const user = await getSingleUser(2)
//   // const ingredients = user.Item.ingredients.L;
//   console.log(
//     "the func worked ",
//     user
//   );
// })();

//update User (can update any attribute)
async function updateUserName(id, name) {
  const params = {
    TableName: "Users",
    Item: {
      userId: id,
      name: name,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  return await DocumentClient.put(params).promise();
}
//update User by adding a new ingredient
async function updateUserIngredients(id,userName,firstName,lastName, newIngredient) {
  const params = {
    TableName: "Users",
    Item: {
      userId: id,
      userName,
      firstName,
      lastName,
      ingredients:[newIngredient]
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  return await DocumentClient.put(params).promise();
}
// //run in node
// (async () => {
//   console.log(
//     "the func worked",
//     await updateUserIngredients(
//     3,
//     "irina_bareto","Irina","Bareto",
//       "champagne"
//     )
//   );
// })();

//delete User
async function deleteUser(id) {
  const params = {
    TableName: "Users",
    Key: {
      userId: id,
    },
  };

  return await DocumentClient.delete(params).promise();
}
// (async () => {
//   console.log("the func worked", await deleteUser("4"));
// })();

module.exports = {
  createTable,
  addUser,
  getAllUsers,
  getSingleUser,
  updateUserName,
  updateUserIngredients,
  deleteUser,
};
