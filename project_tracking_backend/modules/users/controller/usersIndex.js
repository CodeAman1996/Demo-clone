const path = require("path");
const service = require("../services/users.service");
const { connectToDatabase } = require("../../../db");
const { sendResponse } = require("../../../utils/sendResponse");
const logger = require("../../../utils/logger");
const Service = async () => {
	return service;
};

const get = async (event) => {
	const users = await Service();
	const request = users["getService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { User, Role } = await connectToDatabase();
		let data = await request(User, Role);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const getById = async (event) => {
	try {
		const users = await Service();
		const request = users["getByIdService"];
		if (!request) {
			return {
				body: `Http method ${event.httpmethod} not supported for ${event.path}`,
				statusCode: 405,
			};
		}

		const { User, Role, Permission } = await connectToDatabase();
		let data = await request(event.pathParameters.id, User, Role, Permission);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const post = async (event) => {
	const users = await Service();
	const request = users["postService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { User, Role } = await connectToDatabase();
		let data = await request(JSON.parse(event.body), User, Role);
		logger.debug({ data });
		return data;
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patch = async (event) => {
	const users = await Service();
	const request = users["patchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { User } = await connectToDatabase();
		let data = await request(
			event.pathParameters.id,
			JSON.parse(event.body),
			User
		);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		
		return sendResponse(500, { error: e.message });
	}
};

const imageUpload = async (event) => {
	const users = await Service();
	const request = users["imageUploadService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}

    try {
		const { User } = await connectToDatabase();
		const parsedBody = JSON.parse(event.body);
        const base64File = parsedBody.profileImage;
        const decodedFile = Buffer.from(base64File.replace(/^data:image\/\w+;base64,/, ""), "base64");
		let data = await request(event.pathParameters.id, decodedFile, User);
		logger.debug({ data });
		return sendResponse(200, { data });
    } catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}  
};

const userRolePatch = async (event) => {
	const users = await Service();
	const request = users["userRolePatchService"];
	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { User, Role } = await connectToDatabase();
		let data = await request(JSON.parse(event.body), User, Role);
		logger.debug({ data });
		return sendResponse(200, { data });
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const Delete = async (event) => {
	const users = await Service();
	const request = users["deleteService"];

	if (!request) {
		return {
			body: `Http method ${event.httpmethod} not supported for ${event.path}`,
			statusCode: 405,
		};
	}
	try {
		const { User } = await connectToDatabase();
		let response = await request(event.pathParameters.id, User);
		logger.debug("The response for our delete api is", { response: response });
		return sendResponse(200, {
			data: { message: "User has been deleted succesfully" },
		});
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const deleteReq = async (event) => {
	const users = await Service();
	const request = users["imageDeleteService"];
  
	if (!request) {
	  return {
		body: `Http method ${event.httpmethod} not supported for ${event.path}`,
		statusCode: 405,
	  };
	}
  
	try {
	  const { User } = await connectToDatabase();
	  const data = await request(event.pathParameters.id, User);
	  logger.debug({data});
	  return sendResponse(200, { data });
	} catch (e) {
	  logger.error(`error: ${e.message}`);
	  return sendResponse(500, { error: e.message });
	}
  };
module.exports = {
	get,
	getById,
	post,
	patch,
	userRolePatch,
	Delete,
	imageUpload,
	deleteReq
};
