import nodemailer from "nodemailer";
import HttpError from "./HttpError.js";

const { EMAIL_HOST, EMAIL_PORT, EMAIL_ADDRESS, EMAIL_PASSWORD, EMAIL_SECURE } =
  process.env;

const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: parseInt(EMAIL_PORT, 10),
  secure: EMAIL_SECURE === "true",
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD,
  },
});

const sendEmail = async (data) => {
  const email = {
    ...data,
    from: `Contacts Api ${EMAIL_ADDRESS}`,
  };
  try {
    const result = await transporter.sendMail(email);
    return result;
  } catch (error) {
    console.error("SendMail error:", error);
    throw HttpError(
      500,
      "Verification email sending failed. Please request email re-sending."
    );
  }
};

export default sendEmail;
