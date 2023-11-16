const service = require("../services/permission.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
  return service;
};

const get = async (event) => {
  const permissions = await Service();
  const request = permissions["getService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }
  try {
    const { Permission } = await connectToDatabase();
    let data = await request(Permission);
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const getById = async (event) => {
  const permissions = await Service();
  const request = permissions["getByIdService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }
  try {
    let { Permission } = await connectToDatabase();
    let data = await request(event.pathParameters.id, Permission);
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
  const permissions = await Service();
  const request = permissions["postService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Permission } = await connectToDatabase();
    const data = await request(
      JSON.parse(event.body),
      Permission
    );
    return sendResponse(200, {data});
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const patch = async (event) => {
  const permissions = await Service();
  const request = permissions["patchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Permission } = await connectToDatabase();
    const data = await request(
      event.pathParameters.id,
      JSON.parse(event.body),
      Permission
    );
    logger.debug({data});
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const deleteReq = async (event) => {
  const permissions = await Service();
  const request = permissions["deleteService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Permission } = await connectToDatabase();
    const data = await request(event.pathParameters.id, Permission);
    logger.debug({data});
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

module.exports = { get, post, patch, deleteReq, getById };
