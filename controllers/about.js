const About = require('../models/about');

exports.about_get_all = (req, res) => {
    About.find()
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

exports.create_about = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const about = new About({
        title: req.body.title,
        description: req.body.description,
        header: req.body.header,
        content: req.body.content,
        postImage: url + "/uploads/" + req.file.filename,
    });
    try{
        const savedAbout = await about.save();
        res.json(savedAbout);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_about = async (req, res) => {
    try{
        const removedAbout = await About.deleteOne({ _id: req.params.aboutId });
        res.json(removedAbout);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_about = async (req, res) => {
    try{
        const updatedAbout = await About.updateOne(
            { _id: req.params.aboutId }, 
            { $set: {
                title: req.body.title,
                description: req.body.description,
                header: req.body.header,
                content: req.body.content,
                postImage: req.file.path,
            }}
        );
        res.status(200).json(updatedAbout);
    }catch(err){
        res.status(500).json({ message: err })
    }
};
