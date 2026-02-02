import express from "express";
import Contact from "../models/contactModel.js";
import { sendEmail } from "../utils/sendEmail.js";

const router = express.Router();

router.post("/contact", async (req, res, next) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // 1. Save to database
        await Contact.create({
            name,
            email,
            phone,
            message,
        });
        // 2. Send email to ADMIN (you)
        await sendEmail({
            email: process.env.SMTP_MAIL, // send to yourself
            subject: "New Contact Request | E-Commerce Platform",
            message: `You have received a new contact request from your website.

            -------------------------------------------------------------------

             Name    : ${name} 
             Email   : ${email} 
             Phone   : ${phone} 

             Message : 
             ${message}

             ------------------------------------------------------------------

             This message was sent from the S24 Technologies contact form.`,
        });
        // 3️⃣ AUTO-REPLY email to USER (this is what you asked)
        await sendEmail({
            email: email, // user's email
            subject: "We received your message | S24 Technologies",
            message: `
Hi ${name},

Thank you for contacting S24 Technologies.

We have received your message and our team will review it shortly.
We usually respond within 24–48 hours.

If your inquiry is urgent, you can reply to this email.

Best regards,
S24 Technologies
www.s24technologies.com`,
        });
        res.status(201).json({
            success: true,
            message: "Message sent successfully",
        });
    } catch (error) {
        next(error);
    }
});

export default router;