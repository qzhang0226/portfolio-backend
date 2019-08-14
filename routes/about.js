const express = require('express');
const multer = require('multer');
const AboutController = require('../controllers/about');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage,
}); 

const router = express.Router();

router.get('/', AboutController.about_get_all)
      .post('/', upload.single('postImage'), AboutController.create_about)
      .delete('/:aboutId', AboutController.delete_about)
      .patch('/:aboutId', AboutController.update_about)

module.exports = router;
