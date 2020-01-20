"use strict";

var proudctsController = require("./db");

module.exports = {
  createOrder: async (root, { input }) => {
    let response;
    response = await proudctsController.insertNewOrder(input);

    for (const element in input.products) {
      await proudctsController.insertNewProductOrder({
        ...input.products[element],
        idOrder: parseInt(response.id)
      });
    }

    return response;
  }
};
