const Contact = require("../models/contact");

exports.contact_get_all = (req, res) => {
  Contact.find()
    .exec()
    .then((items) => {
      console.log(res);
      const response = {
        contact: items.map((item) => {
          return item;
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.create_contact = async (req, res) => {
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
  });
  try {
    const savedContact = await contact.save();
    res.json(savedContact);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.delete_contact = async (req, res) => {
  try {
    const removedContact = await Contact.deleteOne({
      _id: req.params.contactId,
    });
    res.json(removedContact);
  } catch (err) {
    res.json({ message: err });
  }
};

exports.update_contact = async (req, res) => {
  try {
    const updatedContact = await Contact.updateOne(
      { _id: req.params.contactId },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          subject: req.body.subject,
          message: req.body.message,
        },
      }
    );
    res.status(200).json(updatedContact);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
