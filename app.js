const express = require('express');
const app = express();
const hbs = require('hbs');
const multer = require('multer');

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

db.sequelize
    .sync()
    .then(() => {
        app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
    })
    .catch((e) => console.log(e));

// uncomment the code below if you launching the program for the first time and have no data saved in the database

// db.sequelize.sync({ force: true }).then(() => {
//   app.listen(PORT, () => console.log(`Drop and Resync database`));
//   initial();
// });