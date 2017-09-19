'use strict'

const router = require('express').Router()  // eslint-disable-line new-cap

router.post('/', require('./handler/create'))

module.exports = router