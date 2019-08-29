const request = require('request');
const Home = require('../models/home');

module.exports = async (req, res) => {

    const uriAbout = req.protocol + "://" + req.get("host") + "/about";
    const uriProfile = req.protocol + "://" + req.get("host") + "/profile";
    const uriProject = req.protocol + "://" + req.get("host") + "/project";
    const uriQuotation = req.protocol + "://" + req.get("host") + "/quotation";

    try{
        const updatedHome = await Home.updateOne(
            { _id: "5d67f1764ecdd219f1fb8654" }, 
            { $set: {
                about: {},
                profile: {},
                project: {},
                quotation: {}
            }}
        );
        res.json(updatedHome)
    }catch(err){
        res.json({message: "Update failed"})
    }
};