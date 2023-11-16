require("dotenv").config();
const bcrypt = require("bcryptjs");
const logger = require("../../../utils/logger");
const { sendResponse } = require("../../../utils/sendResponse");
const { sendEmail } = require("../../../utils/nodemailer");
const path = require("path");
const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const { v4: uuid } = require("uuid");

const getService = async (User, Role) => {
	try {
		const lists = await User.findAll({
			attributes: { exclude: ["roleId", "resetLink"] },
			order: [["firstName", "ASC"]],
			include: [
				{
					model: Role,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					as: "role",
				},
			],
		});
		return lists;
	} catch (e) {
		throw e;
	}
};

const getByIdService = async (UserId, User, Role, Permission) => {
	try {
		const list = await User.findByPk(UserId, {
			attributes: { exclude: ["roleId", "resetLink"] },
			include: [
				{
					model: Role,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					as: "role",
				},
			],
		});

		if (!list) {
			throw new Error(
				"Oops! User Id not found or Something went wrong. Please try again with diffrent User Id!"
			);
		}
		const updatedList = {
			...list.toJSON(),
			role: {
				...list.role.toJSON(),
			},
		};

		return updatedList;
	} catch (e) {
		throw e;
	}
};

const postService = async (body, User, Role) => {
	try {
		const salt = await bcrypt.genSalt(10);
		const { firstName, lastName, password, email } = body;
		if ((body, User)) {
			const emailExists = await User.findOne({ where: { email: body.email } });
			if (emailExists) {
				return sendResponse(403, {
					data: {
						error:
							"User already exists with this email address, please try with different email!",
					},
				});
			} else {
				const defaultRole = await Role.findOne({ where: { roleType: "User" } });
				const data = await User.create({
					firstName,
					lastName,
					password: await bcrypt.hash(password, salt),
					email: email.toLowerCase(),
					roleId: defaultRole.dataValues.roleId,
				});

				if (data) {
					const loginUrl = "http://localhost:3001/login";
					const subject = "User creation";
					const content = ` <p>Hello from Samsung Project Tracking Portal</p>
          <p>Your account has been created succesfully!</p>
          <a href="${loginUrl}">Click here for login</a>
          <p>Thank you.</p>
            `;
					const info = await sendEmail(email, subject, content);
					if (info) {
						console.log("Email send successfully", info);
					}
				}
				return sendResponse(200, {
					data: { message: "User created succesfully" },
				});
			}
		}
	} catch (e) {
		logger.error(`error: ${e.message}`);
		return sendResponse(500, { error: e.message });
	}
};

const patchService = async (userId, body, User) => {
	try {
		const { firstName, lastName, password, phone, email } = body;

		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error(
				"Oops! User Id not found or Something went wrong. Please try again with diffrent User Id !"
			);
		}
		if (email) {
			throw new Error("You can't update the email address.");
		}
		await user.update({
			firstName,
			lastName,
			password,
			phone,
		});
		return { message: "User has been updated successfully" };
	} catch (e) {
		throw e;
	}
};

const imageUploadService = async (userId, decodedFile, User) => {
	try {
		function getFileExtension(fileData) {
			const fileSignature = fileData.slice(0, 4); // Get the first 4 bytes of the Buffer object

			if (fileSignature.equals(Buffer.from([0x89, 0x50, 0x4e, 0x47]))) {
				return "png";
			} else if (
				fileSignature.equals(Buffer.from([0xff, 0xd8, 0xff, 0xe0])) ||
				fileSignature.equals(Buffer.from([0xff, 0xd8, 0xff, 0xe1]))
			) {
				return "jpeg";
			} else if (fileSignature.equals(Buffer.from([0x42, 0x4d]))) {
				return "bmp";
			} else if (fileSignature.equals(Buffer.from([0xff]))) {
				return "jpg";
			}

			return null;
		}
		const fileExtension = getFileExtension(decodedFile);
		console.log("fileExtension: ", fileExtension);
		if (!fileExtension) {
			throw new Error(
				"Invalid file type! only PNG, JPG, JPEG and BMP file types are allowed "
			);
		}
		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error(
				"Oops! User ID not found or something went wrong. Please try again with a different User ID!"
			);
		}
		AWS.config.update({
			accessKeyId: process.env.AWS_ACCESS_KEY_ID,
			secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
			region: process.env.AWS_REGION,
		});
		const params = {
			Bucket: "user-profile-image-container",
			Key: `images/${uuid()}.${new Date().toISOString()}.${fileExtension}`,
			Body: decodedFile,
			ContentType: "image/png,image/jpeg,image/bmp",
			ACL: "public-read",
		};
		const uploadResult = await s3.upload(params).promise();
		const imageUrl = uploadResult.Location;
		console.log("Image URL: ", imageUrl);
		user.profileImage = imageUrl;

		await user.save();
		return {
			message: "User profile picture has  been uploaded successfully",
			uploadResult,
		};
	} catch (e) {
		throw e;
	}
};

const userRolePatchService = async (body, User, Role) => {
	try {
		const list = await User.findByPk(body.loggedInUserId, {
			attributes: { exclude: ["roleId", "resetLink"] },
			include: [
				{
					model: Role,
					attributes: { exclude: ["createdAt", "updatedAt"] },
					as: "role",
				},
			],
		});
		const roleType = list.role.roleType
		if(roleType !== "Admin"){
            throw new Error("Oops! you don't have admin access");
		}
		for (const role of body.userRoles) {
			const { userId, roleId } = role;
            console.log("userId, roleId", userId, roleId);
			await User.update({ roleId }, { where: { userId } });
			logger.info(`Users role has been  updated for ${userId}`);
		}
		return { message: "Users role has been  updated" };
	} catch (e) {
		throw e;
	}
};

const deleteService = async (userId, User) => {
	try {
		const user = await User.findByPk(userId);
		if (user === null) throw { error: "Id Not Found" };
		user.destroy();
		return user.toJSON();
	} catch (e) {
		throw e;
	}
};

const imageDeleteService = async (userId, User) => {
	try {
		const user = await User.findByPk(userId);
		if (!user) {
			throw new Error(
				"Oops! USer Id not found or Something went wrong. Please try again with diffrent User Id !"
			);
		} else {
			user.profileImage = null;
			await user.save();
		}
		return { message: "User Profile has been deleted successfully" };
	} catch (e) {
		throw e 
	}
};



module.exports = {
	getService,
	getByIdService,
	postService,
	patchService,
	userRolePatchService,
	deleteService,
	imageUploadService,
	imageDeleteService
};
