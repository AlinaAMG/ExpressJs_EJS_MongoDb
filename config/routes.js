const express = require("express");
const router = express.Router();
const controller = require("../controllers/controller");


router.get('/', controller.homePage);
router.get("/about", controller.aboutBlogs);
router.get("/blogs", controller.blogs);

router.get('/blogs/create', controller.createBlogs);
router.post("/blogs", controller.createBlogsPost);

router.get("/blogs/:id", controller.renderDetails)
router.post("/blogs/delete/:id", controller.deleteBlog);
router.get("/add-blog",controller.addBlogs)
 
router.get("/all-blogs", controller.allBlogs);


router.get("/single-blog",controller.singleBlog)
router.get("/*", controller.pageNotFound);


module.exports = router;
