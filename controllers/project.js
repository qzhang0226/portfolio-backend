const Project = require('../models/project');
const ProjectDetails = require('../models/projectDetails');

exports.project_get_all = (req, res) => {
    Project.find()
        .exec()
        .then(items => {
            const response = {
                projects: items.map(item => {
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
        name: req.body.name,
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
                name: req.body.name,
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

exports.project_get_details = (req, res) => {
    ProjectDetails.find({ name: req.params.name })
        .exec()
        .then(items => {
            return items.map(item => {
                res.status(200).json(item)
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create_project_details = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    console.log(req.files)
    const projectDetails = new ProjectDetails({
        title: req.body.title,
        description: req.body.description,
        postImage: req.files.postImage.map(file => {
            const imageInfo = {
                name: file.filename,
                url: url + "/uploads/" + file.filename
            }
            return imageInfo;
        }),
        // postImage: getPostImage(url, req.files),
        keywords: req.body.keywords,
        name: req.body.name,
        youtubeUrl: req.body.youtubeUrl,
        youtubeImg: url + "/uploads/" + req.files.youtubeImg.map(img => {
            return img.filename
        })
    }); 
    try{
        const savedProject = await projectDetails.save();
        res.json(savedProject);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_project_details = async (req, res) => {
    try{
        const removedProjectDetails = await ProjectDetails.deleteOne({ _id: req.params.projectId });
        res.json(removedProjectDetails);
    }catch(err){
        res.json({ message: err });
    }
}
