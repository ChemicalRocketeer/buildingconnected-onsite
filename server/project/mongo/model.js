'use strict'

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	name: {
		required: true,
		type: String,
	},
	size:        {
		required: true,
		type: Number,
	},
	awsLocation: {
		required: true,
		type: String,
	},
	parentId: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model('Project', schema)