'use strict'

const model = require('../mongo/model')

module.exports = properties => {
	return model.create(properties)
}