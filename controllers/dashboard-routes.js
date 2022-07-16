const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require("../config/connection");

router.get("/", withAuth, async (req, res) => {
    try {
        const userPostData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }, 
            attributes: ["title", "created_at"]
        }); 

        const userPosts = userPostData.map((post) => post.get({ plain: true }));

        res.render("dashboard", {
            userPosts, 
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
}); 

module.exports = router;