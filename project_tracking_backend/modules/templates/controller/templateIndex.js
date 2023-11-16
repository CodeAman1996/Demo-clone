const service = require("../services/template.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
  return service;
};

const get = async (event) => {
  const templates = await Service();
  const request = templates["getService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }
  try {
    const { Template, Category, Task, User } = await connectToDatabase();
    let data = await request(Template, Category, Task, User);
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const getById = async (event) => {
  const templates = await Service();
  const request = templates["getByIdService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }
  try {
    let { Template, Category, Task, User } = await connectToDatabase();
    let data = await request(event.pathParameters.id, Template, Category, Task, User);
    logger.info(
      `getting the data of template: ${data.dataValues.templateName} for templateId: ${data.dataValues.templateId}`
    );
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const post = async (event) => {
  const templates = await Service();
  const request = templates["postService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Template, Category, Task } = await connectToDatabase();
    const data = await request(
      JSON.parse(event.body),
      Template,
      Category,
      Task
    );
    return sendResponse(200, {data});
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const patch = async (event) => {
  const templates = await Service();
  const request = templates["patchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Template } = await connectToDatabase();
    const data = await request(
      event.pathParameters.id,
      JSON.parse(event.body),
      Template
    );
    logger.info("template updated successfully");
    return sendResponse(200, { data });
  } catch (e) {
    // console.log("error", e.message);
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const deleteReq = async (event) => {
  const templates = await Service();
  const request = templates["deleteService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Template } = await connectToDatabase();
    const data = await request(event.pathParameters.id, Template);
    logger.debug("Template has been deleted successfylly", {data});
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

module.exports = { get, post, patch, deleteReq, getById };
