const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Route for handling form submissions
app.post("/send-email", async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // Optional: Validate Recaptcha if needed
  if (!recaptchaToken) {
    return res.status(400).json({ error: "Recaptcha verification failed" });
  }

  try {
    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "Gmail", // Change based on your email provider
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password or app-specific password
      },
    });

    const mailOptions = {
      from: email, // Sender's email
      to: process.env.RECEIVER_EMAIL, // Your email where messages will be sent
      subject: `New Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ success: "Message sent successfully!" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send message. Please try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
