import express from "express";
import { sendEmail } from "../services/email.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { to, subject, html } = req.body;

    if (!to || !subject || !html) {
      return res.status(400).json({
        success: false,
        message: "to, subject, and html are required",
      });
    }

    await sendEmail({ to, subject, html });

    return res.json({
      success: true,
      message: "Email(s) sent successfully",
    });
  } catch (error) {
    console.error("[email route] Failed to send email:", error.message);
    return res.status(500).json({
      success: false,
      message: "Failed to send email",
    });
  }
});

export default router;
