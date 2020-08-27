const AWS = require("aws-sdk");
const { accessKeyId, secretAccessKey, endpoint } = require("../secrets");
let awsConfig = {
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
      // { AttributeName: "email", KeyType: "RANGE" },
    ],
    AttributeDefinitions: [
      { AttributeName: "userId", AttributeType: "N" },
      // { AttributeName: "email", AttributeType: "S" },
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
// async function addUser(id, userName, firstName, lastName, email, password) {
//   const params = {
//     TableName: "Users",
//     Item: {
//       userId: id,
//       userName: userName,
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       ingredients: [],
//       password: password
//     },
//   };

//   return await DocumentClient.put(params).promise();
// }
//changed primary key to email !!!for another table
async function addUser(userName, firstName, lastName, email, password) {
  const params = {
    TableName: "Users",
    Item: {
      userName: userName,
      firstName: firstName,
      lastName: lastName,
      email: email,
      ingredients: [],
      password: password,
    },
  };

  return await DocumentClient.put(params).promise();
}
// (async () => {
//     console.log(
//         "the func worked",
//         await addUser(
//             "jfjbfurgh",
//             "fvfbf",
//             "bgbg",
//             "sara@gmail.com",
//             "lovecoding"
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
      userId: id,
    },
  };
  return await DocumentClient.get(params).promise();
}

// async function getSingleUser(email) {
//   const params = {
//     TableName: "Users2",
//     Key: {
//       email,
//     },
//   };
//   return await DocumentClient.get(params).promise();
// }
//get single user (for another table)!!!
async function getSingleUserByEmail(email) {
  const params = {
    TableName: "Users2",
    Key: {
      // userId:id,
      email: email,
    },
  };
  return await DocumentClient.get(params).promise();
}
// (async () => {
//   const user = await getSingleUserByEmail("sara@gmail.com")
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
async function updateUserIngredients(id, newIngredient) {
  const user = await getSingleUser(id);
  // console.log('user is',user.Item)
  const userIngredients = user.Item.ingredients;
  // console.log('user ingredients',userIngredients)
  const updatedIngredients = [...userIngredients, ...newIngredient];
  console.log("updated ingred in DynamoDB", updatedIngredients);
  const params = {
    TableName: "Users",
    Key: {
      userId: id,
    },
    UpdateExpression: `set ingredients = :ingredients`,
    ExpressionAttributeValues: {
      ":ingredients": updatedIngredients,
    },
  };
  return await DocumentClient.update(params).promise();
}
// //run in node
// (async () => {
//   console.log(
//     "the func worked",
//     await updateUserIngredients(
//     2,
//      ["champagne"]
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
