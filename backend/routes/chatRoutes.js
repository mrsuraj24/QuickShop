import OpenAI from "openai";
import express from "express";
import { verifyUserAuth } from "../middleware/userAuth.js";
import dotenv from 'dotenv';
dotenv.config({ path: 'frontend/src/.env' })

const router = express.Router();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
router.post("/api/v1/chatbot", verifyUserAuth, async (req, res) => {
    try {
        const { message } = req.body;
        if (!message || typeof message !== "string") {
            return res.status(400).json({ error: "Message is required" });
        }
        if (message.length > 2000) {
            return res.status(400).json({ error: "Message too long" });
        }
        const response = await openai.responses.create({
            model: "gpt-5-mini",
            input: message
        });
        res.status(200).json({
            success: true,
            reply: response.output_text
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Chatbot service unavailable" });
    }
});

export default router;