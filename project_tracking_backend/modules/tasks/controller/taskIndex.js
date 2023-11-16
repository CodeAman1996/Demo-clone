const path = require("path");
const service = require("../services/task.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");

const Service = async () => {
  return service;
};

const post = async (event) => {
  const tasks = await Service();
  const request = tasks["postService"];

  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Task } = await connectToDatabase();
    const data = await request(JSON.parse(event.body), Task);
    logger.debug("Task has been created successfully", { data });
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const patch = async (event) => {
  const tasks = await Service();
  const request = tasks["patchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Task } = await connectToDatabase();
    const data = await request(
      JSON.parse(event.body),
      Task
    );
    logger.debug("Task has been updated successfully", { data });
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const priorityPatch = async (event) => {
  const tasks = await Service();
  const request = tasks["priorityPatchService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Task } = await connectToDatabase();
    const data = await request(
      JSON.parse(event.body),
      Task
    );
    logger.debug(data);
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

const deleteReq = async (event) => {
  const tasks = await Service();
  const request = tasks["deleteService"];
  if (!request) {
    return {
      body: `Http method ${event.httpmethod} not supported for ${event.path}`,
      statusCode: 405,
    };
  }

  try {
    const { Task } = await connectToDatabase();
    const data = await request(JSON.parse(event.body), Task);
    logger.debug({ data });
    return sendResponse(200, { data });
  } catch (e) {
    logger.error(`error: ${e.message}`);
    return sendResponse(500, { error: e.message });
  }
};

module.exports = { post, patch, priorityPatch, deleteReq };
