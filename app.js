const express = require('express');
const app = express();
const hbs = require('hbs');
const multer = require('multer');
const path = require('path');

const db = require('./models');
const initial = require('./utils/initial');

const PORT = process.env.PORT || 7777;

const postRouter = require('./routes/post.router');
const authRouter = require('./routes/auth.router');

app.use(express.json());
app.use(express.static('public'));
app.use(express.static(__dirname));
app.use(multer({ dest: 'uploads' }).single('image'));
app.use(express.urlencoded({ extended: false }));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use('/', postRouter);
app.use('/auth', authRouter);

const start = async () => {
  try {
    await db.sequelize.authenticate();
    await db.sequelize.sync();
    app.listen(PORT, () => console.log(`Server started on port : ${PORT}`));
    // uncomment this function if you want to add fake music dates for DB
    //initial()
  } catch (err) {
    console.log(err);
  }
};

start().then();
