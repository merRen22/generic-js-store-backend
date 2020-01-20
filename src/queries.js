'use strict'

var proudctsController = require('./db')

module.exports = {
  getProducts: () => {
    return proudctsController.findAllProducts()
  },
  getProductsByName: (root, name) => {
    return proudctsController.findProductByName(name)
  }
}
