const Post = require('../models/model');

const { marked } = require('marked');
const domPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const purify = domPurify(new JSDOM().window);

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
  const post = Post.findOne({ where: { slug: req.params.slug } })
    .then((data) => {
      if (!data) res.redirect('/');
      if (data.markdown) {
        data.markdown = purify.sanitize(marked(data.markdown));
      }
      res.render('show.hbs', { post: data });
    })
    .catch((err) => console.log(err));
};
