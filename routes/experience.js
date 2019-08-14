const express = require('express');
const ExperienceController = require('../controllers/experience');

const router = express.Router();

router.get('/', ExperienceController.experience_get_all)
      .post('/', ExperienceController.create_experience)
      .delete('/:experienceId', ExperienceController.delete_experience)
      .patch('/:experienceId', ExperienceController.update_experience)

module.exports = router;
