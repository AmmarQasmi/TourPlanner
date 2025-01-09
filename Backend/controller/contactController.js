import { transporter } from "../nodemailer/nodemailer.config.js"; 

export const sendNotification = async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    if (!subject || !name || !email || !phone || !message) {
        return res.status(400).json({ message: "Subject, Name, Email, Phone number, and Message are required." });
    }

    try {
        // Step 1: Send an email to the user
        const userSubject = `Thank you for contacting us - ${subject}`;
        const userHtml = `
            <p>Thank you for contacting us, ${name}!</p>
            <p>We have received your query with the following details:</p>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
            <p>Our team will contact you shortly after reviewing your request.</p>
        `;

        await transporter.sendMail({
            from: `"Support Team" <${process.env.EMAIL}>`, 
            to: email,
            subject: userSubject,
            html: userHtml,
        });

        // Step 2: Notify the website administrator
        const adminSubject = `New Contact Us Request - ${subject}`;
        const adminHtml = `
            <h2>A new contact request has been received:</h2>
            <ul>
              <li><strong>Name:</strong> ${name}</li>
              <li><strong>Email:</strong> ${email}</li>
              <li><strong>Phone:</strong> ${phone}</li>
              <li><strong>Subject:</strong> ${subject}</li>
              <li><strong>Message:</strong> ${message}</li>
            </ul>
        `;

        await transporter.sendMail({
            from: `"Website Notifications" <${process.env.EMAIL}>`,
            to: process.env.EMAIL,
            subject: adminSubject,
            html: adminHtml,
        });

        res.status(201).json({
            message: "Contact Us request submitted successfully!",
            contactUsRequest: { name, email, phone, subject, message },
        });
    } catch (error) {
        console.error("Error creating contact us request:", error);
        res.status(500).json({ message: "An error occurred while processing your request." });
    }
};
