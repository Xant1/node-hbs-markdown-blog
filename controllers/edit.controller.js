const Post = require('../models/model');

exports.getEditPage = function (req, res) {
  const postid = req.params.id;
  Post.findAll({ where: { id: postid }, raw: true })
    .then((data) => {
      res.render('edit.hbs', {
        post: data[0],
      });
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
