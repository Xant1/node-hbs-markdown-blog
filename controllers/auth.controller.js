const User = require('../models/user.model');
const Role = require('../models/role.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require("../models")
const config = require("../config/auth.config")
const Op = db.Sequelize.Op;

exports.getAuthPage = (req, res) => {
  res.render('auth.hbs')
}

exports.register = (req, res) => {
  // Save new User to the database
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password,8)
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }//end of 'where'
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ message: "User was registered successfully!" });
          });
        });
      } else {
        // if no Role specified, User is saved as 'User' by default
        user.setRoles([1]).then(() => {
          res.send({ message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};
exports.signin = (req, res) => {
  User.findOne({
    where: {
        username: req.body.username
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
      var passwordCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordCorrect) {
        return res.status(401).send({
          accessToken: null,
          message: "Incorrect password!"
        });
      }//if(passwordCorrect)
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
      });
      var permissions = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
            permissions.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
            id: user.id,
            roles: permissions,
            username: user.username,
            accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });

};