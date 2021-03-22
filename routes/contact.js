const express = require("express");
// const ContactController = require("../controllers/contact");
const Contact = require("../models/contact");
const nodemailer = require("nodemailer");

const router = express.Router();
// router
//   .get("/", ContactController.contact_get_all)
//   .post('/', ContactController.create_contact)
//   .delete("/:contactId", ContactController.delete_contact)
//   .patch("/:contactId", ContactController.update_contact);

router.get("/", (req, res) => {
  res.send("we are on contact");
});

router.post("/", (req, res) => {
  const post = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  post
    .save()
    .then((data) => {
      res.json(data);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "qinnyc0226@gmail.com",
          pass: "cjndeLAOg0226qi",
        },
      });
      const emailContent = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
      };
      const mailOptions = {
        from: "qinnyc0226@gmail.com",
        to: "zhangqvivi@gmail.com",
        subject: "New Contact",
        text: `
        name: ${emailContent.name}
        Email: ${emailContent.email}
        Subject: ${emailContent.subject}
        Message: ${emailContent.message}
        `,

        // amp: `<!doctype html>
        // <html ⚡4email>
        // <head>
        //   <meta charset="UTF-8"/>
        //   <meta http-equiv="X-UA-Compatible"/>
        //   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        //   <title>Document</title>
        // </head>
        // <body>
        //   <p>Name: ${emailContent.name}</p>
        //   <p>Email: ${emailContent.email}</p>
        //   <p>Subject: ${emailContent.subject}</p>
        //   <p>Message: ${emailContent.message}</p>
        // </body>
        // </html>`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + res.json(data));
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err });
    });
});

module.exports = router;
