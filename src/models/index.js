'use strict'

const fs = require('fs')
const path = require('path')
const basename = path.basename(__filename)
const Sequelize = require('sequelize')

const db = {}

let sequelize

if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL)
} else {
  const { DB_USER, DB_PASSWD, DB_HOST, DB_NAME } = process.env
  sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWD, {
    host: DB_HOST,
    dialect: 'mysql',
    operatorsAliases: false
  })
}

fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js'
    )
  })
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
