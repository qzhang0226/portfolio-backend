const Home = require('../models/home');
const request = require('request');

exports.home_get_all = (req, res, next) => {

    // get about, profile, project, quotation, and blog
    const uriAbout = req.protocol + "://" + req.get("host") + "/about";
    const uriProfile = req.protocol + "://" + req.get("host") + "/profile";
    const uriProject = req.protocol + "://" + req.get("host") + "/project";
    const uriQuotation = req.protocol + "://" + req.get("host") + "/quotation";
    const uriBlog = req.protocol + "://" + req.get("host") + "/blog";

    request.get(uriAbout, async (err, resp, body) => {
        if(err) {
            return next(err);
        }
        const about = JSON.parse(body);

        request.get(uriProfile, async (err, resp, body) => {
            if(err) {
                return next(err);
            }
            const profile = JSON.parse(body);

            request.get(uriProject, async (err, resp, body) => {
                if(err) {
                    return next(err);
                }
                const project = JSON.parse(body);

                request.get(uriQuotation, async (err, resp, body) => {

                    if(err) {
                        return next(err);
                    }
                    const quotation = JSON.parse(body);

                    request.get(uriBlog, async (err, resp, body) => {

                        if(err) {
                            return next(err);
                        }
                        const blog = JSON.parse(body);

                        const home = new Home({
                            about: about.data[0],
                            profile: profile,
                            project: project,
                            quotation: quotation,
                            blog: blog
                        });
                        try{
                            const savedHome = await home.save();
                            res.json(savedHome);
                        } catch(err){
                            res.json({message: "created failed"})
                        }

                    })
                })
            })
        })
    });
}

