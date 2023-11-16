const service = require("../services/category.service");
const {connectToDatabase} = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require('../../../utils/logger');

const Service = async () => {
  return  service;
};

const post = async (event) => {
  const categories = await Service();
  const request = categories["postService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const {Category, Task } = await connectToDatabase();
    const data =  await request(JSON.parse(event.body), Category, Task); 
    logger.debug("Task has been created successfully", {data})
    return sendResponse(200, {data});
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500,{error: e.message});
  }
};

const patch = async (event) => {
  const categories = await Service();
  const request = categories["patchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Category } = await connectToDatabase();
    const data = await request(
      event.pathParameters.id,
      JSON.parse(event.body),
      Category
    );
    logger.debug("Category has been updated successfully",{data})
    return sendResponse(200, {data});
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500,{error: e.message});
  }
};

const priorityPatch = async (event) => {
  const categories = await Service();
  const request = categories["priorityPatchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Category } = await connectToDatabase();
    const data = await request(
      JSON.parse(event.body),
      Category
    );
    logger.debug(data)
    return sendResponse(200, {data});
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500,{error: e.message});
  }
};

const deleteReq = async (event) => {
  const categories = await Service();
  const request = categories["deleteService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Category } = await connectToDatabase();
    const data = await request(event.pathParameters.id, Category);
    logger.debug({data})
    return sendResponse(200,{data} );
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500,{error: e.message});
  }
};

module.exports = { post, patch, priorityPatch, deleteReq };
