import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.MAIL_PASS;
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tourplanner0@gmail.com",
    pass: password,
  },
});