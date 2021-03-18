const express = require("express");
const ContactController = require("../controllers/contact");
const Contact = require("../models/contact");

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
    })
    .catch((err) => {
      console.log(err);
      res.json({ message: err });
    });

  //   console.log(contactInfo);

  //   savedData.save(savedData, function (err, result) {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       console.log(result);
  //     }
  //   });

  //     .save()
  //     .then((data) => {
  //       res.status(200).json(data);
  //     })
  //     .catch((err) => {
  //       res.json({ message: "error" });
  //     });
});

module.exports = router;
