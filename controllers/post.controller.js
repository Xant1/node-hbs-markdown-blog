const { marked } = require('marked');
const domPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const purify = domPurify(new JSDOM().window);
const Post = require('../models/post.model');

exports.getCreatePage = function (req, res) {
  res.render('create.hbs');
};

exports.createNewPost = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const postTitle = req.body.title;
  const postDescription = req.body.description;
  const postMarkdown = req.body.markdown;
  Post.create({
    title: postTitle,
    description: postDescription,
    markdown: postMarkdown,
  })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.getAllPosts = function (req, res) {
  Post.findAll({ raw: true })
    .then((data) => {
      res.render('index.hbs', {
        posts: data,
      });
    })
    .catch((err) => console.log(err));
};

exports.getPost = function (req, res) {
  Post.findOne({ where: { slug: req.params.slug } })
    .then((data) => {
      if (!data) res.redirect('/');
      if (data.markdown) {
        data.markdown = purify.sanitize(marked(data.markdown));
      }
      res.render('show.hbs', { post: data });
    })
    .catch((err) => console.log(err));
};

exports.getEditPage = function (req, res) {
  const postid = req.params.id;
  Post.findAll({ where: { id: postid }, raw: true })
    .then((data) => {
      res.render('edit.hbs', { post: data[0] });
    })
    .catch((err) => console.log(err));
};

exports.editPost = function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const postTitle = req.body.title;
  const postDescription = req.body.description;
  const postMarkdown = req.body.markdown;
  const postid = req.body.id;
  Post.update(
    { title: postTitle, description: postDescription, markdown: postMarkdown },
    { where: { id: postid } }
  )
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

exports.deletePost = function (req, res) {
  const postid = req.params.id;
  Post.destroy({ where: { id: postid } })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};

