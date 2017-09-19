'use strict'

const create = require('../command/create-one')

module.exports = (req, res, next) => {
	// req.query:
	//   { parentId: '', projectId: '59c1708eed7f6b1f1644400c' }
	// req.file: 
	//   { fieldname: 'file',
	//   originalname: 'readme.md',
	//   encoding: '7bit',
	//   mimetype: 'application/octet-stream',
	//   size: 3536,
	//   bucket: 'coding-challenges',
	//   key: '/projects/59c1708eed7f6b1f1644400c/1505853244394/readme.md',
	//   acl: 'private',
	//   contentType: 'application/octet-stream',
	//   contentDisposition: null,
	//   storageClass: 'STANDARD',
	//   serverSideEncryption: null,
	//   metadata: null,
	//   location: 'https://coding-challenges.s3.amazonaws.com//projects/59c1708eed7f6b1f1644400c/1505853244394/readme.md',
	//   etag: '"b8b7818599c192f3108398ba0a329151"' }

	const file = req.file
	const query = req.query
	return create({
		type:        'FILE',
		name:        file.originalname,
		size:        file.size,
		awsLocation: file.location,
		parentId:    query.parentId || query.projectId,
	})
	.then(fileDoc => res.json(fileDoc))
	.catch(next)
}