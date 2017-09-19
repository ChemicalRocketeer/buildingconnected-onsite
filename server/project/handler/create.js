'use strict'

const init = require('../command/init')
const findById = require('../query/find-by-id')

module.exports = (req, res, next) => {
	init(req.body)
		.then(createdProject => findById(createdProject._id))
		.then(project => res.json(project))
		.catch(next)
}