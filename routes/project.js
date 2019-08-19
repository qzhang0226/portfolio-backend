const express = require('express');
const multer = require('multer');
const ProjectController = require('../controllers/project');

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

router.get('/', ProjectController.project_get_all)
      .post('/', upload.single('postImage'), ProjectController.create_project)
      .delete('/:projectId', ProjectController.delete_project)
      .patch('/:projectId', upload.single('postImage'), ProjectController.update_project)

module.exports = router;
