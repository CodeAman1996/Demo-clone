'use strict';
const {connectToDatabase} = require('../../db/index');
const service = require('../services/auth.service');
const { sendResponse } = require('../../utils/sendResponse');
const logger = require('../../utils/logger');



const Service = async () => {
  return service;
}
  const login = async (event, context) => {
   
  const users = await Service();
  const request = users['loginService'];
  if(!request) {
    return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
   }
    try{
    const { User, Role, Permission } = await connectToDatabase();
    let data = await request(User,JSON.parse(event.body), Role, Permission);
    
      logger.debug({data});
      return sendResponse(200,{ data});
   }
   catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500,{error: e.message});
     }
   };


   const forgotPassword = async (event, context) => {
   
    const users = await Service();
    const request = users['forgotPaswordService'];
    if(!request) {
      return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
     }
      try{
      const { User } = await connectToDatabase();
      let data = await request(User,JSON.parse(event.body));
      
        logger.debug({data});
        return data;
     
     }
     catch (e) {
      logger.error(`error: ${e.message}`);
      return sendResponse(500,{error: e.message});
       }
     };

      const resetPassword = async (event) => {
   
        const users = await Service();
        const request = users['resetPaswordService'];
        if(!request) {
          return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
         }
          try{
          const { User } = await connectToDatabase();
          let data = await request( event.pathParameters.token,JSON.parse(event.body),User);
            logger.debug({data});
            return sendResponse(200,{ message: 'your password has been changed'});
         }
         catch (e) {
          logger.error(`error: ${e.message}`);
          return sendResponse(500,{error: e.message});
           }
         };

   module.exports = {login,forgotPassword,resetPassword};