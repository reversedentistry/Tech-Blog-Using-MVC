const router = require("express").Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth');


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

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render("homepage", {
            posts,
            logged_in: req.session.logged_in
        })

    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/signup", (req, res) => {
    res.render("signup")
});

router.get("/login", (req, res) => {
    if (req.session.logged_in) {
        res.redirect("/profile");
        return;
    }
    res.render("login")
});

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: Comment,
                    include: [
                        {
                            model: User,
                            attributes: ["username"]
                        }
                    ]
                },
                {
                    model: User,
                    attributes: ["username"]
                }
            ]
        })

        const post = postData.get({ plain: true });
        res.render("post", {
            ...post,
            logged_in: req.session.logged_in
        })
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/newpost", withAuth, (req, res) => {
    res.render("newpost")
});

router.get("/dashboard", withAuth, async (req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });


    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/edit/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findOne({
            where: {
                id: req.params.id,
                
            }
        });

        if (!postData) {
            res.status(404).json({ message: "You cannot edit this post." });
            return;
        }; 

        const post = postData.get({ plain: true }); 
        res.render("edit", {
            ...post,
            logged_in: true
        }); 
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;