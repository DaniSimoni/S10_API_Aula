const connection = require('../database');
const { Sequelize } = require('sequelize');
const User = require('../models/user');

const Task = connection.define('task', {

    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    name:{
        type: Sequelize.STRING,
        allowNull: false,
    },

    description:{
        type: Sequelize.STRING,
        allowNull: true,
    },
    userId: {
        type: Sequelize.INTEGER
    }

})

Task.belongsTo(User)

module.exports = Task;