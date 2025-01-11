import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Nodemailer Transporter Configuration
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // Explicitly set Gmail SMTP server
  port: 465, // Use 465 for SSL or 587 for TLS
  secure: true, // true for SSL, false for TLS
  auth: {
    user: process.env.EMAIL, // Sender's email address
    pass: process.env.MAIL_PASS, // App Password from environment
  },
  tls: {
    rejectUnauthorized: false, // Skip certificate validation for development/testing
  },
  logger: true, // Enable logs for debugging
  debug: true,  // Enable debugging output
});
