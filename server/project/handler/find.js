'use strict'

const find = require('../query/find')

module.exports = (req, res, next) => {
	find({ isRoot: true })
		.then(projects => res.json(projects))
		.catch(next)
}