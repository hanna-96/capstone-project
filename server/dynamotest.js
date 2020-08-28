const AWS = require("aws-sdk");
if (process.env.NODE_ENV === "dev") require("../secrets");

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
    TableName: "Users3",
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
//   try{
//     console.log('the func worked', await createTable())
//   } catch(err) {
//     console.log(err)
//   };
// })()
createTable()