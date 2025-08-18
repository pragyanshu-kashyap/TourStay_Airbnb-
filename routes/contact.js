const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
require("dotenv").config();

// POST /contact - handle contact form submission
router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    // Configure transporter
    let transporter = nodemailer.createTransport({
      secure: true,
      port: 465,
      host: "smtp.gmail.com",
      service: "gmail", // or another email provider
      auth: {
        user: process.env.CONTACT_EMAIL, // your gmail address
        pass: process.env.CONTACT_EMAIL_PASS, // your gmail app password
      },
    });

    // Email options
    let mailOptions = {
      from: email,
      to: process.env.CONTACT_EMAIL, // your email to receive messages
      subject: `TourStay Contact Form: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    req.flash(
      "success",
      "Your message has been sent! We will get back to you soon."
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    req.flash(
      "error",
      "There was an error sending your message. Please try again later."
    );
    res.redirect("/");
  }
});

module.exports = router;
