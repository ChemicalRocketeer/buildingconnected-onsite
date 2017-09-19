'use strict'

const model = require('../mongo/model')
const changeFolderSizes = require('./change-folder-sizes')

module.exports = data => {
	return model
		.create(data)
		.call('toObject')
		.then(file => {
			return changeFolderSizes(file, file.size)
				.then(() => file) // this command returns the file document
		})
}