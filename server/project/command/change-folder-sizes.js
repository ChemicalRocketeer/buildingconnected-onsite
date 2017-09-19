'use strict'

const model = require('../mongo/model')

const changeFolderSizes = (file, diff) => {
    if (!file || !file.parentId) return;
	return model
        .findOneAndUpdate({ _id: file.parentId }, { $inc: { size: diff }})
        .lean()
        .exec()
        // recurse until we hit the root folder, which has no parent
        .then(parentDoc => changeFolderSizes(parentDoc, diff))
}

module.exports = changeFolderSizes