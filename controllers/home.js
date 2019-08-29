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
            res.json(response);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.create_home = async (req, res, next) => {
    const uriAbout = req.protocol + "://" + req.get("host") + "/about";
    const uriProfile = req.protocol + "://" + req.get("host") + "/profile";
    const uriProject = req.protocol + "://" + req.get("host") + "/project";
    const uriQuotation = req.protocol + "://" + req.get("host") + "/quotation";
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

                    const home = new Home({
                        about: about.data[0],
                        profile: profile,
                        project: project,
                        quotation: quotation
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
    });
}

exports.delete_home = async (req, res) => {
    try{
        const removedHome = await Home.deleteOne({ _id: req.params.homeId });
        res.json(removedHome);
    }catch(err){
        res.json({ message: err });
    }
}

// exports.update_home = async (req, res) => {
//     const uriAbout = req.protocol + "://" + req.get("host") + "/about";
//     const uriProfile = req.protocol + "://" + req.get("host") + "/profile";
//     const uriProject = req.protocol + "://" + req.get("host") + "/project";
//     const uriQuotation = req.protocol + "://" + req.get("host") + "/quotation";
//     request.get(uriAbout, async (err, resp, body) => {
//         if(err) {
//             return next(err);
//         }
//         const about = JSON.parse(body);

//         request.get(uriProfile, async (err, resp, body) => {
//             if(err) {
//                 return next(err);
//             }
//             const profile = JSON.parse(body);

//             request.get(uriProject, async (err, resp, body) => {
//                 if(err) {
//                     return next(err);
//                 }
//                 const project = JSON.parse(body);

//                 request.get(uriQuotation, async (err, resp, body) => {

//                     if(err) {
//                         return next(err);
//                     }
//                     const quotation = JSON.parse(body);
//                     try{
//                         const updatedHome = await Home.updateOne(
//                             { _id: "5d67f1764ecdd219f1fb8654" }, 
//                             { $set: {
//                                 about: about.data[0],
//                                 profile: profile,
//                                 project: project,
//                                 quotation: quotation
//                             }}
//                         );
//                         res.status(200).json(updatedHome);
//                     }catch(err){
//                         res.status(500).json({ message: err })
//                     }
//                 })
//             })
//         })
//     });
// };