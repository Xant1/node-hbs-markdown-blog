const db = require('../models');
const Role = db.role;


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



module.exports = initial