"use strict";
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  getProducts: (root, args, { db }, info) => {
    return db.products.findAll();
  },
  getProductsByName: (root, args, { db }, info) => {
    return db.products.findAll({
      where: { name: { [Op.like]: "%" + args.name + "%" } }
    });
  }
};
