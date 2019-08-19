const Project = require('../models/project');

exports.project_get_all = (req, res) => {
    Project.find()
        .exec()
        .then(items => {
            const response = {
                data: items.map(item => {
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

exports.create_project = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const project = new Project({
        title: req.body.title,
        description: req.body.description,
        postImage: url + "/uploads/" + req.file.filename,
    });
    try{
        const savedProject = await project.save();
        res.json(savedProject);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_project = async (req, res) => {
    try{
        const removedProject = await Project.deleteOne({ _id: req.params.projectId });
        res.json(removedProject);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_project = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    Project.updateOne({ _id: req.params.projectId }, { "$set": {
                title: req.body.title,
                description: req.body.description,
                postImage: url + "/uploads/" + req.file.filename,
            }})
            .then(result => {
                res.status(200).json({
                    result
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: "Failed to update"
                })
            })
};
