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
	type: {
		type: String,
		enum: ['FILE', 'FOLDER'],
		default: 'FOLDER'
	},
	size: Number,
	awsLocation: String,
	parentId: mongoose.Schema.Types.ObjectId,
})

// for quickly finding project roots
schema.index({ isRoot: 1 })

module.exports = mongoose.model('Project', schema)
