'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap
const multer = require('multer')
const multerS3 = require('multer-s3')
const s3 = require('../lib/s3')

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

router.post(
	'/', 
	uploader.single('file'), 
	require('./handler/upload-file')
)

router.get('/', require('./handler/find-files'))
router.get('/:id/content', require('./handler/load-file.js'))
router.get('/download-all', require('./handler/download-all'))

module.exports = router