const express = require('express');
const multer = require('multer');
const BlogController = require('../controllers/blogs');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ 
    storage,
}); 

const router = express.Router();

router.get('/', BlogController.blogs_get_all)
      .post('/', upload.single('postImage'), BlogController.create_blog)
      .delete('/:blogId', BlogController.delete_blog)
      .patch('/:blogId', upload.single('postImage'), BlogController.update_blog)

module.exports = router;
