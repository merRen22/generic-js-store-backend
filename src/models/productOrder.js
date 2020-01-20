"use strict";

module.exports = (sequelize, DataTypes) => {
  const ProductOrder = sequelize.define(
    "productorders",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: DataTypes.INTEGER,
        foreignKey: "orderId"
      },
      productId: {
        type: DataTypes.INTEGER,
        foreignKey: "productId"
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false
      }
    },
    {
      freezeTableName: false,
      timestamps: false
    }
  );

  ProductOrder.associate = models => {
    ProductOrder.belongsTo(models.products, { foreignKey: "productId" });
    ProductOrder.belongsTo(models.orders, { foreignKey: "orderId" });
  };

  return ProductOrder;
};
