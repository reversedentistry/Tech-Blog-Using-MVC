const router = require("express").Router();
const { Post, User } = require('../models');
const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User, 
                    attributes: ["username"],
                }, 
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true})); 

        res.render("homepage", {
            posts, 
        })

    } catch (err) {}
})

module.exports = router;