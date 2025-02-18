const { Sequelize } = require('sequelize');

// SQLite Database Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/pos_db.sqlite'
});

sequelize.authenticate()
  .then(() => console.log('SQLite Database connected...'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;