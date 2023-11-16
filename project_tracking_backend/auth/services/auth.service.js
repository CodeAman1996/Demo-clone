const jwt = require("jsonwebtoken");
const { sendResponse } = require("../../utils/sendResponse");
const bcrypt = require("bcryptjs");
const secretKey = "Admin@123samsung";
const { sendEmail } = require("../../utils/nodemailer");
const logger = require("../../utils/logger");

const loginService = async (User, data, Role, Permission) => {
	try {
		const { email, password } = data;
		const user = await User.findOne({
			where: {
				email: email.toLowerCase(),
			},
		});
		if (!user) {
			return {
				message: "We couldn't find any user associated with this email.",
				token: null,
			};
		} else {
			const isSame = await bcrypt.compare(password, user.password);
			if (isSame) {
				const list = await User.findOne({
					where: {
						email: email.toLowerCase(),
					},
					attributes: [],
					include: [
						{
							model: Role,
							attributes: ["roleType"],
							as: "role",
						},
					],
				});
				const role = list.dataValues.role.roleType;
				const token = jwt.sign({ userId: user.userId, role }, secretKey, {
					expiresIn: "15d",
				});
				return {
					message: "User logged in succesfully",
					token,
					userId: user.userId,
					role,
				};
			}
			if (!isSame) {
				logger.error("Password is incorrect");
				return { message: "Password is incorrect", token: null };
			}
		}
	} catch (e) {
		throw e;
	}
};

const forgotPaswordService = async (User, data) => {
	try {
		const { email } = data;

		// Validate email address
		if (!email) {
			throw new Error("Email is required");
		}

		const user = await User.findOne({
			where: {
				email: email.toLowerCase(),
			},
		});
		if (!user) {
			return sendResponse(401, {
				data: {
					error:
						"We couldn't find any user associated with this email. To proceed, please create a new user account or re-check your email.",
				},
			});
		}
		const token = jwt.sign({ userId: user.userId }, secretKey, {
			expiresIn: "5m",
		});

		user.resetLink = token;
		await user.save();

		const resetUrl = `http://localhost:3001/resetPassword/${token}`;

		const subject = "Reset password";

		const content = `<p>Hello from Samsung Project Tracking Portal ,</p>
			 <p>We have received a request to reset your password. Please click the following link to continue the process:</p>
			 <a href="${resetUrl}">Reset Password</a>
			 <p>If you did not request a password reset, please ignore this email.</p>
			 <p>Thank you.</p>
	
				 `;

		await sendEmail(email, subject, content);
		return sendResponse(200, {
			data: {
				message:
					"Your reset password link has been sent to your email address. Please, check your mail.",
			},
		});
	} catch (e) {
		throw e;
	}
};
const resetPaswordService = async (resetToken, body, User) => {
	try {
		const { password } = body;
		if (resetToken) {
			const decoded = jwt.verify(resetToken, secretKey);
			const { userId } = decoded;
			console.log("userid", userId);

			const user = await User.findOne({
				where: { userId: userId, resetLink: resetToken },
			});

			if (!user) {
				return sendResponse(400, {
					message: "User does not exist with this token!",
				});
			}

			const hashedPassword = await bcrypt.hash(password, 10);
			user.password = hashedPassword;
			user.resetLink = null;

			await user.save((err, result) => {
				if (err) {
					return sendResponse(400, {
						message: "Something went wrong in reset password!",
					});
				} else {
					return sendResponse(400, {
						result,
						message:
							"Your password has been successfully reset. Please use your new password to log in to your account",
					});
				}
			});
		} else {
			return sendResponse(401, {
				message: "Authentication error in reset password!",
			});
		}
	} catch (e) {
		throw e;
	}
};
module.exports = { loginService, forgotPaswordService, resetPaswordService };
