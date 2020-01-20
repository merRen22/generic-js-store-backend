const { Sequelize, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize("generic_store", "root", "1234", {
  host: "localhost",
  dialect: "mysql"
});
const Op = Sequelize.Op;

class Product extends Model {}
Product.init(
  {
    id: { type: DataTypes.SMALLINT, primaryKey: true },
    name: DataTypes.STRING,
    price: DataTypes.FLOAT
  },
  {
    sequelize,
    timestamps: false,
    modelName: "products"
  }
);

class Order extends Model {}
Order.init(
  {
    id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    totalPrice: DataTypes.FLOAT,
    taxes: DataTypes.FLOAT,
    shippingCost: DataTypes.FLOAT
  },
  {
    sequelize,
    timestamps: false,
    modelName: "orders"
  }
);

class ProductOrder extends Model {}
ProductOrder.init(
  {
    id: { type: DataTypes.SMALLINT, primaryKey: true, autoIncrement: true },
    idOrder: DataTypes.SMALLINT,
    idProduct: DataTypes.SMALLINT,
    price: DataTypes.FLOAT
  },
  {
    sequelize,
    timestamps: false,
    modelName: "productorders"
  }
);

exports.findAllProducts = async function() {
  return await Product.findAll();
};

exports.findProductByName = async function(name) {
  return await Product.findAll({
    where: { name: { [Op.like]: "%" + name.name + "%" } }
  });
};

exports.insertNewOrder = async function(OrderInput) {
  return await Order.create({
    totalPrice: OrderInput.totalPrice,
    taxes: OrderInput.taxes,
    shippingCost: OrderInput.shippingCost
  });
};

exports.insertNewProductOrder = async function(ProductOrderInput, idOrder) {
  return await ProductOrder.create({
    price: ProductOrderInput.price,
    idProduct: ProductOrderInput.idProduct,
    idOrder: idOrder
  });
};
