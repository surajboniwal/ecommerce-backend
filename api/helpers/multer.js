const multer = require('multer')
const { v4:uuid } = require('uuid')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './../product-images/'))
    },
    filename: function (req, file, cb) {
      req.filename = uuid()
      cb(null, req.filename)
    }
})

const upload = multer({ storage: storage })

module.exports = upload