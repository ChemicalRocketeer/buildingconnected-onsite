'use strict'

const createOne = require('./create-one')

module.exports = data => {
    data = Object.assign({}, data, { isRoot: true })
	return createOne(data)
}