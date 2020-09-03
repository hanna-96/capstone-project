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
  try{
    const params = {
      TableName: "Users3",
      KeySchema: [{ AttributeName: "userName", KeyType: "HASH" }],
      AttributeDefinitions: [{ AttributeName: "userName", AttributeType: "S" }],
      ProvisionedThroughput: {
        ReadCapacityUnits: 3,
        WriteCapacityUnits: 3,
      }
    }
    return await DynamoDB.createTable(params).promise();
  } catch(e) { 
    console.error(e)
    next(e) }
}
// (async ()=>{
//   console.log('table is created', await createTable());
// })()
//changed primary key to email !!!for another table
async function addUser(userName, firstName, lastName, email, password,googleId="") {
  try {
    const params = {
      TableName: "Users3",
      Item: {
        userName,
        firstName,
        lastName,
        email,
        ingredients: [],
        favorites: [],
        friends: [],
        password,
        googleId
      },
    };

    return await DocumentClient.put(params).promise()
  } catch(e) { next(e) }
}
// (async () => {
//     console.log(
//         "the func worked",
//         await addUser(
//             "sara95dfsfa",
//             "C",
//             "Rzsdfdsfa",
//             "sara@gail.com",
//             "123",
//             )
//             );
//         })();

//get single user (for another table)!!!
async function getSingleUserByUserName(userName) {
  try {
    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
    };
    return await DocumentClient.get(params).promise()
  } catch(e) { next(e) }
}
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();

// get allUsers (!!!expensive operation!!!)
async function getAllUsers() {
  try {
    const params = {
      TableName: "Users3",
    };
    return await DocumentClient.scan(params).promise()
  } catch(e) { next(e) }
}
// (async () => {
//   console.log(
//     "the func worked ",
//     await getAllUsers()
//   );
// })();

//update User (can update any attribute)
async function updateUserName(userName, name) {
  try {
    const params = {
      TableName: "Users3",
      Item: {
        userName,
        name,
      },
      ReturnConsumedCapacity: "TOTAL",
    };
    return await DocumentClient.put(params).promise()
  } catch(e) { next(e) }
}
//update User by adding a new ingredient
async function updateUserIngredients(userName, newIngredient) {
  try {
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
    return await DocumentClient.update(params).promise()
  } catch(e) { next(e) }
}

async function deleteUserIngredients(userName, deleteIdx) {
  try {
    const user = await getSingleUserByUserName(userName);
    const userIngredients = user.Item.ingredients;
    const numIdx = Number(...deleteIdx)
    const removedUserIngredients = [...userIngredients.filter((ingred, idx) => idx!== numIdx)];
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
    return await DocumentClient.update(params).promise()
  } catch(e) { next(e) }
}

//add to or remove from user favorites
//user object's favorites are updated on the frontent before being sent here
async function updateUserFavorites(userName, favorites) {
  try {

    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
      UpdateExpression: `set favorites = :f`,
      ExpressionAttributeValues: {
        ":f": favorites
      }
    }
  return await DocumentClient.update(params).promise()
  } catch(e) { next(e) }
}




async function updateUserFriends(userName, friend) {
  try {
    const user = await getSingleUserByUserName(userName);
    if(user.Item.friends) {
      const userFriends = user.Item.friends;
      console.log(userFriends)
      const updatedFriends = [...userFriends, friend]
    
    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
      UpdateExpression: `set friends = :friends`,
      ExpressionAttributeValues: {
        ":friends": updatedFriends
      }
    }
  
  return await DocumentClient.update(params).promise()
    } else {
      console.log('no friends arr')
    }
  } catch(e) { console.log(e) }
}

//run in node
// (async () => {
//   console.log(
//     "the func worked",
//     await updateUserFriends(
//     "sara95",
//      ["sara"]
//     )
//   );
// })();


//delete User
async function deleteUser(userName) {
  try {
    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
    };

    return await DocumentClient.delete(params).promise()
  } catch(e) { next(e) }
}
// (async () => {
//   console.log("the func worked", await deleteUser("4"));
// })();

module.exports = {
  DynamoDB,
  createTable,
  addUser,
  getAllUsers,
  getSingleUserByUserName,
  updateUserName,
  updateUserIngredients,
  deleteUser,
  deleteUserIngredients,
  updateUserFavorites,
  updateUserFriends
};
