const express = require('express');
const app = express();

const sequelize = require('./config/connection');
const PORT = process.env.PORT || 7777;
const hbs = require('hbs');

const indexRouter = require('./routes/index.router');
const createRouter = require('./routes/create.router');
const deleteRouter = require('./routes/delete.router');
const newPostRouter = require('./routes/new.post.router');
const editRouter = require('./routes/edit.router');
const getPostRouter = require('./routes/get.post.router');
const authRouter = require('./routes/auth.router');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.get('/', indexRouter);
app.get('/create', createRouter);
app.post('/create', newPostRouter);
app.post('/edit', editRouter);
app.post('/delete/:id', deleteRouter);
app.get('/edit/:id', editRouter);
app.get('/post/:id', getPostRouter);
app.use('/auth', authRouter);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
});
