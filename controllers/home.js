const Home = require('../models/home');
const request = require('request');

exports.home_get_all = (req, res, next) => {
    Home.find()
        .exec()
        .then(items => {
            const response = {
                home: items.map(item => {
                    return item;
                })
            };

            const uriAbout = req.protocol + "://" + req.get("host") + "/about";
            const uriProfile = req.protocol + "://" + req.get("host") + "/profile";
            const uriProject = req.protocol + "://" + req.get("host") + "/project";
            var home = {};
            request.get(uriAbout, (err, resp, body) => {
                if (err) {
                    return next(err);
                }
                const about = JSON.parse(body);
                home = Object.assign(response, about);
                res.json(home)
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}