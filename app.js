const express = require('express');
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const PORT = 7777;
const Post = require('./models/model');
//import routes
const indexRouter = require('./routes/index.router');
const createRouter = require('./routes/create.router');
const deleteRouter = require('./routes/delete.router');
const newPostRouter = require('./routes/new.post.router');
const editRouter = require('./routes/edit.router');

app.use(express.static('public'));
app.set('view engine', 'hbs');

app.listen(PORT, function () {
  console.log(`server started on port: ${PORT}`);
});

app.get('/', indexRouter);
app.get('/create', createRouter);
app.post('/create', urlencodedParser, newPostRouter);
app.post('/delete/:id', deleteRouter);
app.get('/edit/:id', editRouter);
app.post('/edit', urlencodedParser, editRouter);

app.get('/post/:id', function (req, res) {
  const post = Post.findOne({ where: { id: req.params.id } })
    .then((data) => {
      if (!data) res.redirect('/');
      res.render('show.hbs', { post: data });
    })
    .catch((err) => console.log(err));
});
