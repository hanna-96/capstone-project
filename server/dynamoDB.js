const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});
const DynamoDB = new AWS.DynamoDB();

async function createTable() {
  const params = {
    TableName: "Users",
    KeySchema: [
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "userName", KeyType: "HASH" },
      { AttributeName: "firstName", KeyType: "HASH" },
      { AttributeName: "lastName", KeyType: "HASH" },
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "id", KeyType: "HASH" },
      { AttributeName: "id", KeyType: "HASH" },
    ],
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
      { AttributeName: "id", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10,
    },
  };
  return await DynamoDB.createTable(params).promise();
}
