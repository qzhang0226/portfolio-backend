const Experience = require('../models/experience');

exports.experience_get_all = (req, res) => {
    Experience.find()
        .exec()
        .then(items => {
            const response = {
                experiences: items.map(item => {
                    return item;
                })
            }
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create_experience = async (req, res) => {
    const experience = new Experience({
        title: req.body.title,
        description: req.body.description,
        duration: req.body.header,
    });
    try{
        const savedExperience = await experience.save();
        res.json(savedExperience);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_experience = async (req, res) => {
    try{
        const removedExperience = await Experience.deleteOne({ _id: req.params.experienceId });
        res.json(removedExperience);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_experience = async (req, res) => {
    try{
        const updatedExperience = await Experience.updateOne(
            { _id: req.params.experienceId }, 
            { $set: {
                title: req.body.title,
                description: req.body.description,
                duration: req.body.header,
            }}
        );
        res.status(200).json(updatedExperience);
    }catch(err){
        res.status(500).json({ message: err })
    }
};

