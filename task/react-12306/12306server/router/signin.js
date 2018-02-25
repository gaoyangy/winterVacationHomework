var express = require('express')
var router = express.Router()
var cors = require('cors')
var waterfall = require('async/waterfall')
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer()

router.use(cors())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }))

var mysql      = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jin',
  password : '123456',
  database : 'react'
})

router.post('/', upload.array(), function (req, res, next) {
  waterfall([
    function(callback) {
      var  sql = 'INSERT INTO user(id, password) VALUES('+req.body.id+',\''+req.body.password+'\')'
      connection.query(sql,function (err, result) {
              if(err){
                console.log('[SELECT ERROR] - ',err.message)
                callback(null, 0)
                return
              }
              callback(null, 1)
          })
        },
      function(arg, callback) {
        if(arg === 1) {
          var  sql = 'CREATE TABLE `react`.\`user'+req.body.id+'\` ( `id` INT(100) NOT NULL AUTO_INCREMENT '
          +',`number` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL'
          +', `title` VARCHAR(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL'
          +', `time` VARCHAR(1000) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL'
          +', `type` VARCHAR(100) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL'
          +', `state` INT(10) NOT NULL , PRIMARY KEY (`id`), INDEX (`id`)) ENGINE = MyISAM'
          connection.query(sql,function (err, result) {
                  if(err){
                    console.log('[SELECT ERROR] - ',err.message)
                    callback(null, 0)
                    return
                  }
                  callback(null, 1)
              })
            }
            else {
              callback(null, 0)
            }
        },
      function(arg1, callback) {
          res.json({"message": arg1})
          callback(null)
        }
      ], function (err, result) {
  })
})
module.exports = router
