const Post = require('../models/model');

exports.deletePost = function (req, res) {
  const postid = req.params.id;
  Post.destroy({ where: { id: postid } })
    .then(() => {
      res.redirect('/');
    })
    .catch((err) => console.log(err));
};
