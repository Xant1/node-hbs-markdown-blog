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
