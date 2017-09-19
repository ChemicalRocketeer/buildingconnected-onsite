'use strict'

const getSignedUrl = require('../../lib/get-signed-s3-download-url')
const findOne = require('../query/find-one')

module.exports = (req, res, next) => {
    // any Project object with an aws location is a file
    return findOne({ _id: req.params.id, awsLocation: { $exists: true }})
    .then(file => {
        if (!file) return res.sendStatus(404)
        let url = getSignedUrl(file.awsKey)
        return res.redirect(url)
    })
    .catch(next)
}