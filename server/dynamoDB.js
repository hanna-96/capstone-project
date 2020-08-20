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
(async ()=>{
  console.log('the func call', await createTable());
})()

// function addItem(id, userName, firstName, lastName,) {
//   const params = {
//     TableName: "Users",
//     Item: {
//       id: { S: id },
//       name: { S: name },
//       image: { S: image },
//       description: { S: description },
//     },
//   };

//  return await  DynamoDB.putItem(params, async function (err) {
//     if (err) {
//       console.error("Unable to add a spot", err);
//     } else {
//      await console.log(`Added ${name} to the database`);
//     }
//   }.promise());
// }