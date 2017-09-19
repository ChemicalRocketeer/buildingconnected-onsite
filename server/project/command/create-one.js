'use strict'

const model = require('../mongo/model')
const changeFolderSizes = require('./change-folder-sizes')

module.exports = data => {
	let file;
	return model
		.create(data)
		.call('toObject')
		.then(f => { file = f })
		.then(() => changeFolderSizes(file, file.size))
		.then(() => file)
}