"use strict";

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "products",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      coverUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  );

  Product.associate = models => {
    Product.belongsToMany(models.orders, {
      through: "productorders",
      foreignKey: "productId"
    });
  };

  return Product;
};
