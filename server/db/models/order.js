'use strict'

const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  orderNumber: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  orderDate: {
    type: Sequelize.DATE,
    allowNull: false
  },
  shipped: {
    type: Sequelize.BOOLEAN,
    default: false,
    allowNull: false
  },
  quanitity: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

module.exports = Order
