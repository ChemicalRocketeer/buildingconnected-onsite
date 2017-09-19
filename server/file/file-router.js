'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../lib/s3')
const create = require('../project/query/create')

const uploader = multer({
	storage: multerS3({
		s3,
		bucket: 'coding-challenges',
		key: (req, file, cb) => {
			const projectId = req.query.projectId
			return cb(null, `/projects/${projectId}/${Date.now()}/${file.originalname}`)
		},
	}),
})

// This should upload the file, however, you'll still need to add another function after this
// uploader middleware to actually save a record of this file in Mongo
router.post('/', uploader.single('file'), (req, res, next) => {
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
	return create({
		name:        file.originalname,
		size:        file.size,
		awsLocation: file.location,
		parentId:    req.params.parentId
	})
	.then(file => res.json(file))
	.catch(next)
})

module.exports = router