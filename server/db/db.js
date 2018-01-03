const Sequelize = require('sequelize');
const nameOfDb = "employees";
const db = new Sequelize(`postgres://localhost:5432/${nameOfDb}`,
{logging: false})

module.exports = db;
