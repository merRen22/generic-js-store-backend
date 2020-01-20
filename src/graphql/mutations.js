"use strict";

module.exports = {
  createOrder: async (root, args, { db }, info) => {
    let response;
    response = await db.orders.create({
      totalPrice: OrderInput.totalPrice,
      taxes: OrderInput.taxes,
      shippingCost: OrderInput.shippingCost
    });

    for (const element in args.products) {
      await db.productorders.create({
        price: args.products[element].price,
        idProduct: args.products[element].idProduct,
        idOrder: parseInt(response.id)
      });
    }

    return response;
  }
};
