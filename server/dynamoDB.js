const AWS = require("aws-sdk");
const {ACCESS_KEY_ID,SECRET_ACCESS_KEY,region,AWS_ENDPOINT} = require('../secrets')
// if (process.env.NODE_ENV === "dev") require("../secrets");
let awsConfig = {
  region: region,
  endpoint: AWS_ENDPOINT,
  accessKeyId: ACCESS_KEY_ID,
  secretAccessKey:SECRET_ACCESS_KEY,
};

AWS.config.update(awsConfig);
//connecting to AWS DynamoDB
const DynamoDB = new AWS.DynamoDB();
const DocumentClient = new AWS.DynamoDB.DocumentClient();

//creating table
async function createTable() {
  try {
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
  } catch (e) {
    console.error(e);
  }
}
async function addUser(
  userName,
  firstName,
  lastName,
  email,
  password,
  googleId = ""
) {
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
        googleId,
      },
    };

    return await DocumentClient.put(params).promise();
  } catch (e) {
    console.error(e);
  }
}
//get single user (for another table)!!!
async function getSingleUserByUserName(userName) {
  try {
    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
    };
    return await DocumentClient.get(params).promise();
  } catch (e) {
    console.error(e);
  }
}

// get allUsers (!!!expensive operation!!!)
async function getAllUsers() {
  try {
    const params = {
      TableName: "Users3",
    };
    return await DocumentClient.scan(params).promise();
  } catch (e) {
    console.error(e);
  }
}

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
    return await DocumentClient.put(params).promise();
  } catch (e) {
    console.error(e);
  }
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
    return await DocumentClient.update(params).promise();
  } catch (e) {
    console.error(e);
  }
}

async function deleteUserIngredients(userName, deleteIdx) {
  try {
    const user = await getSingleUserByUserName(userName);
    const userIngredients = user.Item.ingredients;
    const numIdx = Number(...deleteIdx);
    const removedUserIngredients = [
      ...userIngredients.filter((ingred, idx) => idx !== numIdx),
    ];
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
  } catch (e) {
    console.error(e);
  }
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
        ":f": favorites,
      },
    };
    return await DocumentClient.update(params).promise();
  } catch (e) {
    console.error(e);
  }
}

async function updateUserFriends(userName, friend) {
  try {
    const user = await getSingleUserByUserName(userName);
    if (user.Item.friends) {
      const userFriends = user.Item.friends;
      console.log(userFriends);
      const updatedFriends = [...userFriends, ...friend];

      const params = {
        TableName: "Users3",
        Key: {
          userName,
        },
        UpdateExpression: `set friends = :friends`,
        ExpressionAttributeValues: {
          ":friends": updatedFriends,
        },
      };

      return await DocumentClient.update(params).promise();
    } else {
      console.log("no friends arr");
    }
  } catch (e) {
    console.log(e);
  }
}

//delete User
async function deleteUser(userName) {
  try {
    const params = {
      TableName: "Users3",
      Key: {
        userName,
      },
    };

    return await DocumentClient.delete(params).promise();
  } catch (e) {
    console.error(e);
  }
}
module.exports = {
  createTable,
  addUser,
  getAllUsers,
  getSingleUserByUserName,
  updateUserName,
  updateUserIngredients,
  deleteUser,
  deleteUserIngredients,
  updateUserFavorites,
  updateUserFriends,
};
