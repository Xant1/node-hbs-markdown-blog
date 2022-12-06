const Post = require('../models/model');

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
