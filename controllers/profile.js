const Profile = require('../models/profile');
const request = require('request');

exports.profile_get_all = (req, res, next) => {
    Profile.find()
        .exec()
        .then(items => {
            const response = {
                profile: items.map(item => {
                    return item;
                })
            };

            const uri = req.protocol + "://" + req.get("host") + "/experience";

            request.get(uri, (err, resp, body) => {
                if (err) {
                    return next(err);
                }
                const allExperience = JSON.parse(body);
                const mergedBody = Object.assign(response, allExperience);
                res.json(mergedBody)
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create_profile = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const profile = new Profile({
        postImage: url + "/uploads/" + req.file.filename,
        title: req.body.title,
        subTitle: req.body.subTitle,
    });
    try{
        const savedProfile = await profile.save();
        res.json(savedProfile);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_profile = async (req, res) => {
    try{
        const removedProfile = await Profile.deleteOne({ _id: req.params.profileId });
        res.json(removedProfile);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_profile = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    Profile.updateOne({ _id: req.params.profileId }, { "$set": {
                postImage: url + "/uploads/" + req.file.filename,
                title: req.body.title,
                subTitle: req.body.subTitle,
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