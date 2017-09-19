'use strict'

const find = require('../query/find')

// find all projects
module.exports = (req, res, next) => {
	find({ parentId: { $exists: false } })
		.then(projects => res.json(projects))
		.catch(next)
}