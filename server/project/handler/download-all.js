'use strict'

const getSignedUrl = require('../../lib/get-signed-s3-download-url')
const findOne = require('../query/find-one')

module.exports = (req, res, next) => {
    // this url takes the user directly to the zip file on aws
    let url = getSignedUrl()

    return res.redirect(url)
}