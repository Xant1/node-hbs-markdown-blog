const Post = require('../models/model');

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
  const post = Post.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) res.redirect('/');
      res.render('show.hbs', { post: data });
    })
    .catch((err) => console.log(err));
};
