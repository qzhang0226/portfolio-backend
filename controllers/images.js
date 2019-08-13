const Images = require('../models/images');

exports.images_get_all = (req, res) => {
    // res.send("We are on images");
    // try{
    //     const image = await Images.find()
    //     res.json(image);
    // } catch(err){
    //     res.json({ message: err });
    // }
    Images.find()
        .select("title, description, postImage")
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                posts: docs.map(image => {
                    return {
                        title: image.title,
                        description: image.description,
                        image: image.image,
                        _id: image._id,
                        request: {
                            type: 'GET',
                            url: "localhost:3000/images" + "image._id"
                        }
                    }
                })
            };    
            res.status(200).json(response);   
        })
}

exports.create_image = async (req, res) => {
    const image = new Images({
        title: req.body.title,
        description: req.body.description,
        postImage: req.file.path,
    });
    try{
        const savedImage = await image.save();
        res.json(savedImage);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_image = async (req, res) => {
    try{
        const removedImage = await Images.deleteOne({ _id: req.params.imageId });
        res.json(removedImage);
    }catch(err){
        res.json({ message: err });
    }
}
