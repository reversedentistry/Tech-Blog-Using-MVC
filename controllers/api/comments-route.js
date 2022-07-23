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

module.exports = router;