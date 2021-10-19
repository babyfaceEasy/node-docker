const Post = require('../models/postModels')

exports.getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find() 
        res.status(200).json({
            status: 'success',
            results: posts.length,
            data: {
                posts
            }
        })
    } catch (err) {
        console.log(error)
        res.status(400).json({
            status: 'fail'
        })
    }
}

exports.getOnePost = async (req, res) => {
    const id = req.params.id
    try{

        const post = await Post.findById(id);
        res.status(200).json({
            status: 'success',
            data: {
                post
            }
        })

    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'fail',
        })
    }
}

exports.createPost = async(req, res) => {
    const { title, body } = req.body
    try{
        const post = await Post.create({title, body})
        res.status(200).json({
            status: 'success',
            data:{
                post
            }
        })
    }catch(err){
        console.log(err)
        res.status(400).json({
            status: 'fail'
        })
    }
}

exports.updatePost = async(req, res) => {
    const { title, body } = req.body

    try{
        const post = await Post.findByIdAndUpdate(req.params.id, { title, body }, {
            new: true,
            runValidators: true
        })
        res.status(200).json({status: 'success', post })
    }catch(err){
        console.log(err)
        res.status(400).json({ status: 'fail' })
    }
}

exports.deletePost = async(req, res) => {
    const id = req.params.id

    try{
        const post = await Post.findByIdAndDelete(id)
        res.status(200).json({ status: 'success' })
    }catch(err){
        console.log(err)
        res.status(400).json({ status: 'fail' })
    }
}