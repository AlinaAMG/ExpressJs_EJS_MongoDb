const Blog = require('../models/blog');
const homePage = (req, res) => {
  const blogs = [
    {
      title: 'Yoshi finds eggs',
      snippet: 'lorem ipsum kjdjdld',
    },
    {
      title: 'mario finds stars',
      snippet: 'lorem ipsum kjdjdld',
    },
    {
      title: 'How to defeat bowser',
      snippet: 'lorem ipsum kjdjdld',
    },
  ];
  res.redirect("/blogs");
};

const blogs = (req, res) => {
  // sort method is going  from the newst to the oldst
  Blog.find().sort({createdAt: -1})
    .then(result => res.render("index", { title: "All Blogs", blogs: result }))
    .catch(err => console.log(err));
}

const aboutBlogs = (req, res) => {
  // res.send("<p>about page</p>")
  res.render('about', { title: 'About Blogs' });
};

const addBlogs = (req, res) => {

  const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog',
  });
  blog
    .save()
    .then(result => {
      res.send(result);
    })
    .catch((err) => console.log(err));
};

const createBlogs = (req, res) => {
  
  res.render('create', { title: 'Create a new blog' });
};

const createBlogsPost = (req, res) => {
  const blog = new Blog(req.body);
  blog.save()
    .then(() => res.redirect("/blogs"))
    .catch(err => console.log(err));
}

const allBlogs=(req, res) => {
  Blog.find()
    .then(result => res.send(result))
    .catch(err => console.log(err));
}

const singleBlog = (req, res) => {
  Blog.findById("67dd2c20442d06e98d1342e0")
    .then(result => res.send(result))
    .catch(err => console.log(err));
}
const renderDetails=(req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render("details", { blog: result, title: "Blog Details" })
    })
    .catch(err => console.log(err));
}

const deleteBlog = (req, res) => {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
  .then(() => res.redirect("/blogs"))
    .catch(err => console.log(err));
}

const pageNotFound = (req, res) => {
  res.status(404).render('404', { title: '404' });
};

module.exports = {
  homePage,
  aboutBlogs,
  blogs,
  addBlogs,
  allBlogs,
  createBlogsPost,
 renderDetails,
  singleBlog,
  createBlogs,
  deleteBlog,
  pageNotFound,
};
