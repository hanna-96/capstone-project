const AWS = require("aws-sdk");
if (process.env.NODE_ENV === "dev") require("../secrets");
let awsConfig = {
  region: "us-east-2",
  endpoint: process.env.AWS_ENDPOINT,
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);
//connecting to AWS DynamoDB
const DynamoDB = new AWS.DynamoDB();
const DocumentClient = new AWS.DynamoDB.DocumentClient();

//creating table
async function createTable() {
  const params = {
    TableName: "Users3",
    KeySchema: [{ AttributeName: "userName", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "userName", AttributeType: "S" }],
    ProvisionedThroughput: {
      ReadCapacityUnits: 3,
      WriteCapacityUnits: 3,
    },
  };
  return await DynamoDB.createTable(params).promise();
}
// (async ()=>{
//   console.log('table is created', await createTable());
// })()
//changed primary key to email !!!for another table
async function addUser(userName, firstName, lastName, email, password) {
  const params = {
    TableName: "Users3",
    Item: {
      userName,
      firstName,
      lastName,
      email,
      ingredients: [],
      password,
    },
  };

  return await DocumentClient.put(params).promise();
}
// (async () => {
//     console.log(
//         "the func worked",
//         await addUser(
//             "anya_96",
//             "Anna",
//             "Rzheutskaya",
//             "nuyta96@gmail.com",
//             "123"
//             )
//             );
//         })();

//get single user (for another table)!!!
async function getSingleUserByUserName(userName) {
  const params = {
    TableName: "Users3",
    Key: {
      userName
    },
  };
  return await DocumentClient.get(params).promise();
}
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();

// get allUsers (!!!expensive operation!!!)
async function getAllUsers() {
  const params = {
    TableName: "Users3",
  };
  return await DocumentClient.scan(params).promise();
}
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();

//update User (can update any attribute)
async function updateUserName(userName, name) {
  const params = {
    TableName: "Users3",
    Item: {
      userName,
      name,
    },
    ReturnConsumedCapacity: "TOTAL",
  };
  return await DocumentClient.put(params).promise();
}
//update User by adding a new ingredient
async function updateUserIngredients(userName, newIngredient) {
  const user = await getSingleUserByUserName(userName);
  const userIngredients = user.Item.ingredients;
  const updatedIngredients = [...userIngredients, ...newIngredient];
  const params = {
    TableName: "Users3",
    Key: {
      userName,
    },
    UpdateExpression: `set ingredients = :allingredients`,
    ExpressionAttributeValues: {
      ":allingredients": updatedIngredients,
    },
  };
  return await DocumentClient.update(params).promise();
}

async function deleteUserIngredients(userName, deleteIdx) {
  const user = await getSingleUserByUserName(userName);
  const userIngredients = user.Item.ingredients;
  const numIdx = Number(...deleteIdx)
  const removedUserIngredients = [...userIngredients.filter((ingred, idx) => idx!== numIdx)];
  console.log(numIdx, removedUserIngredients, 'after removal')
  const params = {
    TableName: "Users3",
    Key: {
      userName,
    },
    UpdateExpression: `set ingredients = :allingredients`,
    ExpressionAttributeValues: {
      ":allingredients": removedUserIngredients,
    },
  };
  return await DocumentClient.update(params).promise();
}



// //run in node
// (async () => {
//   console.log(
//     "the func worked",
//     await updateUserIngredients(
//     "anya_96",
//      ["champagne"]
//     )
//   );
// })();

//delete User
async function deleteUser(userName) {
  const params = {
    TableName: "Users3",
    Key: {
      userName,
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
  getSingleUserByUserName,
  updateUserName,
  updateUserIngredients,
  deleteUser,
  deleteUserIngredients
};
