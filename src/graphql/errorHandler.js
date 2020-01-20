'use strict'

function errorHandler (error) {
  console.error(error)
  throw new Error('Hubo un error inesperado intentelo en otro momento')
}

module.exports = errorHandler
