const Blogs = require('../models/blogs');

exports.blogs_get_all = (req, res) => {
    Blogs.find()
        .exec()
        .then(items => {
            const response = {
                blogs: items.map(item => {
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

exports.create_blog = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const blog = new Blogs({
        name: req.body.name,
        postImage: url + "/uploads/" + req.file.filename,
    });
    try{
        const savedBlog = await blog.save();
        res.json(savedBlog);
    } catch(err){
        res.json({message: err})
    }
}

exports.delete_blog = async (req, res) => {
    try{
        const removedBlog = await Blogs.deleteOne({ _id: req.params.blogId });
        res.json(removedBlog);
    }catch(err){
        res.json({ message: err });
    }
}

exports.update_blog = async (req, res) => {
    try{
        const updatedBlog= await Blog.updateOne(
            { _id: req.params.blogId }, 
            { $set: {
                name: req.body.name,
                postImage: req.file.path,
            }}
        );
        res.status(200).json(updatedBlog);
    }catch(err){
        res.status(500).json({ message: err })
    }
};
