'use strict'

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(
    'orders',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      totalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      taxes: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      shippingCost: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      deliveryDate: {
        type: DataTypes.DATE,
        allowNull: false
      }
    },
    {
      timestamps: false
    }
  )

  Order.associate = function (models) {
    Order.belongsToMany(models.products, {
      through: 'productorders',
      foreignKey: 'orderId'
    })
  }

  return Order
}
