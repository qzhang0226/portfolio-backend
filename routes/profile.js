const express = require('express');
const multer = require('multer');
const ProfileController = require('../controllers/profile');

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

router.get('/', ProfileController.profile_get_all)
      .post('/', upload.single('postImage'), ProfileController.create_profile)
    //   .delete('/:profileId', ProfileController.delete_profile)
    //   .patch('/:profileId', ProfileController.update_profile)

module.exports = router;
