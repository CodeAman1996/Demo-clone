const nodemailer = require("nodemailer");
const { sendResponse } = require("../utils/sendResponse");

const sendEmail = async (email, subject, content) => {
	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.outlook.com",
			port: 587,
			secure: false,
			tls: {
				rejectUnauthorized: false
			  },
			auth: {
				user: "spt.electronics@outlook.com",
				pass: "Samsung123",
			},
		});

		const mailOptions = {
			from: "spt.electronics@outlook.com",
			to: email,
			subject: subject,
			html: content,
		};

		const info = await transporter.sendMail(mailOptions);
		console.log(`Email sent: ${info.response}`);
		return info;
	} catch (error) {
		console.error(error.message);
		throw new Error(`Failed to send email: ${error.message}`);
	}
};
module.exports = { sendEmail };
