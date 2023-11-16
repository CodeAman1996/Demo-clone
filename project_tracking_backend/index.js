const sendResponse = require("./utils/sendResponse");

module.exports.handler = async (event) => {
  let data = {
    message: "Go Serverless v3.0! Your function executed successfully!",
    input: event,
  };
  return sendResponse(200, data);
};
