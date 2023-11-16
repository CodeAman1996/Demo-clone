
const jwt = require('jsonwebtoken');
const utils = require('../utils/policyDocument');
const secretKey = "Admin@123samsung";
const logger = require('../utils/logger');
const { sendResponse } = require('../utils/sendResponse');

module.exports.handler = (event,context,callback) => {
  const token = event.headers.Authorization.split(" ")[1];
  if (!token) {
    return sendResponse(401,{ message: "you are not authenticated"})            ;
  }

  try {
    // Verify JWT
    const decoded = jwt.verify(token, secretKey);
    const user = decoded.userId;
    
    const policyDocument = utils.buildIAMPolicy(user, "Allow", event.methodArn);
     
     callback (null,policyDocument); 
     
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return callback(null,utils.buildIAMPolicy("user", "Deny", event.methodArn));
  }
};