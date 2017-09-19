'use strict'

const createOne = require('../command/create-one')
const findById = require('../query/find-by-id')

module.exports = (req, res, next) => {
	createOne({
        name: req.body.name,
        parentId: req.query.parentId || req.query.projectId
    })
		.then(folder => res.json(folder))
		.catch(next)
}