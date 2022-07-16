const router = require('express').Router();
const { Post } = require("../../models"); 
const withAuth = require("../../utils/auth")

router.post("/", withAuth, async (res, req) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id
        });
        res.status(200).json(err);
    } catch (err) {
        res.status(400).json(err); 
    }
}); 

router.put("/:id", withAuth, async (res, req) => {
    try {
        const updatedPost = await Post.update({
            ...req.body
        }, 
        {
            where: {
                id: req.params.id
            }
        }); 

        if (!updatedPost) {
            res.status(404).json({ message: "No post with this ID." })
        }
        res.status(200).json(err)
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.delete("/:id", withAuth, (req, res) => {
    try {
        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        }); 

        if (!deletedPost) {
            res.status(404).json({ message: "No post with this ID."})
        }
        res.status(200).json(err)
    } catch (err) {
        res.status(500).json(err); 
    }
})