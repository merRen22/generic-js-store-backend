'use strict'

const errorHandler = require('./errorHandler')

module.exports = {
  createOrder: async (root, { input }, { db }, info) => {
    let response
    try {
      response = await db.orders.create({
        totalPrice: input.totalPrice,
        taxes: input.taxes,
        shippingCost: input.shippingCost,
        deliveryDate: input.deliveryDate
      })

      for (const element in input.products) {
        await db.productorders.create({
          price: input.products[element].price,
          productId: input.products[element].idProduct,
          orderId: parseInt(response.id)
        })
      }
    } catch (error) {
      errorHandler(error)
    }

    return response
  }
}
