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
                // const all = response.assign(allExperience);
                console.log(typeof response)
            });
        
            // res.json(response)
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