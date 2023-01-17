const express = require('express');
const app = express();
const hbs = require('hbs');

const db = require('./models');
const Role = db.role;

const PORT = process.env.PORT || 7777;
const cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:7779/',
};

const indexRouter = require('./routes/index.router');
const createRouter = require('./routes/create.router');
const deleteRouter = require('./routes/delete.router');
const newPostRouter = require('./routes/new.post.router');
const editRouter = require('./routes/edit.router');
const getPostRouter = require('./routes/get.post.router');
const authRouter = require('./routes/auth.router');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'))
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

app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'x-access-token, Origin, Content-Type, Accept'
  );
  next();
});

// db.sequelize
//   .sync()
//   .then(() => {
//     app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
//   })
//   .catch((e) => console.log(e));

// uncomment the code below if you launching the program for the first time and have no data saved in the database

db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Drop and Resync database`));
  initial();
});

function initial() {
  Role.create({
    id: 1,
    name: 'user',
  });

  Role.create({
    id: 2,
    name: 'editor',
  });

  Role.create({
    id: 3,
    name: 'admin',
  });
}
