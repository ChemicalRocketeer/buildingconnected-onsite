'use strict'

const find = require('../query/find')

module.exports = (req, res, next) => {
    find({
        parentId:
            req.query.parentId
            || req.params.id
            || req.query.projectId
    })
		.then(projects => res.json(projects))
		.catch(next)
}


