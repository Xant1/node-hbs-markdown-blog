const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

exports.registration = function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'registration error', errors });
  }
  const { username, password } = req.body;
  const candidate = User.findOne({ where: { username: username } })
    .then((data) => {
      if (data) {
        return res
          .status(400)
          .json({ message: 'A user with this name already exists' });
      }
    })
    .catch((err) => console.log(err));

  const hashPassword = bcrypt.hashSync(password, 9);
  const userRole = Role.findOne({ value: 'user' });
  User.create({
    username,
    password: hashPassword,
    roles: [userRole.value],
  })
    .then(() => {
      res.json({ message: 'The user has been successfully registered' });
    })
    .catch((err) => console.log(err));
};

exports.login = function (req, res) {
  const { username, password } = req.body;
  const user = User.findOne({ where: { username: username } })
    .then((data) => {
      if (!data) {
        return res.status(400).json({ message: 'User not found' });
      }
    })
    .catch((err) => console.log(err));
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    return res.status(400).json({ message: 'invalid password or login' });
  }
  const token = generateAccessToken(user._id, user.roles);
  return res.json({ token });
};
