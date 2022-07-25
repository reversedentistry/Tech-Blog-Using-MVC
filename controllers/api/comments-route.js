const router = require('express').Router();
const { Comment, Post, User } = require('../../models');
const withAuth = require('../../utils/auth');

router.get("/", async (req, res) => {
    try {
        const allComments = await Comment.findAll({
            include: [
                {
                    model: Post, 
                    include: {
                        model: User, 
                        attributes: { exclude: ["password"] }
                    }
                }
            ]
        })
        res.json(allComments)
    } catch (err) {
        res.status(500).json(err)
    }
}); 

router.post("/", withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            comment_text: req.body.comment_text,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        }); 
        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err)
    }
}); 

module.exports = router;