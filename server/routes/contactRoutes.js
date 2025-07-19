const nodemailer = require("nodemailer");
const express = require("express");
const Contact = require("../model/Contact");
const verifyToken = require("../middleware/verifyToken");

const router = express.Router();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST /api/contact
router.post("/", verifyToken, async (req, res) => {
  try {
    const contact = new Contact({ ...req.body, userId: req.userId });
    await contact.save();

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: "dr865550@gmail.com",
      subject: "New Contact Form Submission",
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${req.body.name}</p>
        <p><strong>Email:</strong> ${req.body.email}</p>
        <p><strong>Phone:</strong> ${req.body.phone}</p>
        <p><strong>College:</strong> ${req.body.college}</p>
        <p><strong>Address:</strong> ${req.body.address}</p>
        <p><strong>Description:</strong> ${req.body.description}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(201).json({ message: "Contact submitted and emailed!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Submission failed" });
  }
});

module.exports = router;
