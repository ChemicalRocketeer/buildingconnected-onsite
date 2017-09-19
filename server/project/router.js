'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap

router.post('/', require('./handler/create'))
router.get('/', require('./handler/find'))
router.get('/files', require('./handler/find-files'))
router.get('/:id', require('./handler/find-by-id'))

module.exports = router