const path = require("path");
const service = require('../services/users.service');
const connectToDatabase = require('../../../db');
const sendResponse = require('../../../util/sendResponse');

const generateApis = async () => {
    return service;
}

const getAll = async (event) => {
    const users = await generateApis();
    const request = users['GETALL'];
    
    if(!request) {
        return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
    } 
    try{
        const { User } = await connectToDatabase();
       let data = await request(User);
       data = { data: { ...data }, input: event };
       return sendResponse(200, data);
    } catch(e) {
        console.log('error', e.message);             
        return await sendResponse(500,e.message);
    }
}

const getById = async (event) => {
    const users = await generateApis();
    const request = users['GETBYID'];
    
    if(!request) {
        return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
    } 
    try{
        const { User } = await connectToDatabase();
       let data = await request(User);
       data = { data: { ...data }, input: event };
       return sendResponse(200, data);
    } catch(e) {
        console.log('error', e.message);             
        return await sendResponse(500,e.message);
    }
}
const post = async (event) => {
    const users = await generateApis();
    const request = users['POST'];
    if(!request) {
    return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
    } 
    try{
     const { User } = await connectToDatabase();
     let response = await request(JSON.parse(event.body),User);
    
    return sendResponse(200,{ response, message: 'User has been created succesfully' });
        
    } catch(e) {
     console.log('error', e.message);
       return await sendResponse(500,e.message);
    }
}

const put = async (event) => {
    const users = await generateApis();
    const request = users['PUT'];
    if(!request) {
        return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
    } 
    try{
     const { User } = await connectToDatabase();
     let response = await request(event.pathParameters.id,JSON.parse(event.body),User);

     return sendResponse(200,{response, message: 'User has been updated succesfully' });
    } catch(e) {
        console.log('error', e.message);
        return await sendResponse(500,e.message);
    }
}

const Delete = async (event) => {
    const users = await generateApis();
    const request = users['DELETE'];
 
    if(!request) {
        return { body: `Http method ${event.httpmethod} not supported for ${event.path}`, statusCode: 405 };
    } 
    try{
       
     const { User } = await connectToDatabase();
     let response = await request(event.pathParameters.id,User);

     return sendResponse(200,{ message: 'User has been deleted succesfully' });

    } catch(e) {
        console.log('error', e.message);
        return await sendResponse(500,e.message);
   }
}
module.exports = { get,post,put,Delete,generateApis};