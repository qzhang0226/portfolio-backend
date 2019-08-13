const express = require('express');
const multer = require('multer');
const ImageController = require('../controllers/images');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './images/');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toDateString() + "-" + file.originalname);
    }
});

const upload = multer({ 
    storage,
}); 

const router = express.Router();

router.get('/', ImageController.images_get_all)
      .post('/', upload.single('postImage'), ImageController.create_image)
      .delete('/:imageId', ImageController.delete_image)

module.exports = router;
