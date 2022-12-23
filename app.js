const express = require('express');
const app = express();
const urlencodedParser = express.urlencoded({ extended: false });
const PORT = 7777;
const hbs = require('hbs');
//import routes
const indexRouter = require('./routes/index.router');
const createRouter = require('./routes/create.router');
const deleteRouter = require('./routes/delete.router');
const newPostRouter = require('./routes/new.post.router');
const editRouter = require('./routes/edit.router');
const getPostRouter = require('./routes/get.post.router');

app.use(express.json());
app.use(express.static('public'));



app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', indexRouter);
app.get('/create', createRouter);
app.post('/create', urlencodedParser, newPostRouter);
app.post('/delete/:id', deleteRouter);
app.get('/edit/:id', editRouter);
app.post('/edit', urlencodedParser, editRouter);
app.get('/post/:id', getPostRouter);

app.listen(PORT, function () {
  console.log(`server started on port: ${PORT}`);
});
