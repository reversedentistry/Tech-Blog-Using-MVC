const router = require('express').Router();
const userRoutes = require("./users-routes"); 
const postRoutes = require("./posts-routes"); 
const commentRoutes = require("./comments-route"); 

router.use("/users", userRoutes); 
router.use("/posts", postRoutes); 
router.use("/comments", commentRoutes); 

module.exports = router; 