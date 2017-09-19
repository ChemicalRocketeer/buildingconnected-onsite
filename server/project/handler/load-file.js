'use strict'

const s3 = require('../../lib/s3')
const findOne = require('../query/find-one')

module.exports = (req, res, next) => {
    // any Project object with an aws location is a file
    return findOne({ _id: req.params.id, awsLocation: { $exists: true }})
    .then(file => {
        if (!file) return res.sendStatus(404)
        // stream the contents from s3
        console.log(file)
        let stream = s3.getObject({
            Bucket: 'coding-challenges',
            Key: file.awsKey,
        }).createReadStream()
        stream.on('error', next)
        stream.pipe(res)
    })
    .catch(next)
}