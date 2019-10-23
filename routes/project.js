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

var cpUpload = upload.fields([{ name: 'postImage', maxCount: 20 }, { name: 'youtubeImg', maxCount: 1 }])
router.get('/', ProjectController.project_get_all)
      .post('/', upload.single('postImage'), ProjectController.create_project)
      .delete('/:projectId', ProjectController.delete_project)
      .patch('/:projectId', upload.single('postImage'), ProjectController.update_project)
      .get('/:name', ProjectController.project_get_details)
      .post('/:name', cpUpload, ProjectController.create_project_details)
      .delete('/delete/:projectId', ProjectController.delete_project_details)

module.exports = router;
