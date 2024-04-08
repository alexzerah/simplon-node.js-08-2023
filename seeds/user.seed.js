const db = require('../models');
const User = db.User;
const bcrypt = require('bcrypt');

async function seed() {

  const users = [
    { email: 'john@example.com', firstName: 'John', lastName: 'Doe', role: 1, password: bcrypt.hashSync('123', 8) },
    { email: 'jane@example.com', firstName: 'Jane', lastName: 'Doe', role: 1, password: bcrypt.hashSync('123', 8) },
    // Add more users as needed
  ];

  for (let user of users) {
    await User.create(user);
  }

  console.log('Database seeded!');
}

module.exports = seed;