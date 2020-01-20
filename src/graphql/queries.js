'use strict'

const errorHandler = require('./errorHandler')
const { Sequelize } = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  getProducts: async (root, args, { db }, info) => {
    let productResponse
    try {
      productResponse = await db.products.findAll()
    } catch (error) {
      errorHandler(error)
    }
    return productResponse
  },
  getProductsByName: async (root, args, { db }, info) => {
    let productsResponse
    try {
      productsResponse = await db.products.findAll({
        where: { name: { [Op.like]: '%' + args.name + '%' } }
      })
    } catch (error) {
      errorHandler(error)
    }
    return productsResponse
  }
}
