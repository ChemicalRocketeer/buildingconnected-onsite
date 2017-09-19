'use strict'

const getSignedUrl = require('../../lib/get-signed-s3-download-url')
const findOne = require('../query/find-one')

module.exports = (req, res, next) => {
    // any Project object with an aws location is a file, not a folder
    return findOne({ _id: req.params.id, awsLocation: { $exists: true }})
    .then(file => {
        if (!file) return res.sendStatus(404)
        // this url takes the user directly to the file on aws
        let url = getSignedUrl(file.awsKey)
        return res.redirect(url)
    })
    .catch(next)
}