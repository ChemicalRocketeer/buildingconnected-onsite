'use strict'

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const schema = new mongoose.Schema({
	dateCreated: {
		type: Date,
		default: Date.now,
	},
	dateModified: {
		type: Date,
		default: Date.now,
	},
	name: {
		type: String,
		required: true,
	},
	type: {
		type: String,
		enum: ['FILE', 'FOLDER'],
		default: 'FOLDER'
	},
	size: {
		type: Number,
		default: 0,
	},
	awsLocation: String,
	awsKey:      String,
	parentId:    ObjectId,
})

schema.index({ parentId: 1 })

module.exports = mongoose.model('Project', schema)

// uncomment to clear the db
// module.exports.remove({}).exec()