var express = require('express')
var router = express.Router();
var cors = require('cors')
var waterfall = require('async/waterfall')
var bodyParser = require('body-parser')
var multer = require('multer') // v1.0.5
var upload = multer()

router.use(cors())
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true })) 

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'jin',
  password : '123456',
  database : 'react'
})

router.post('/', upload.array(), function (req, res, next) {
  waterfall([
    function(callback) {
      var  sql = 'SELECT * FROM train WHERE start LIKE \''+req.body.start+'\'AND end LIKE\''+req.body.end+'\''
      console.log(sql)
        connection.query(sql,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message)
                  return
                }
                if(result.length > 0) {
                  callback(null, result)
                }
                else{
                  callback(null, [])
                }
            })
        },
      function(arg1, callback) {
        res.json(arg1)
        callback(null)
      }
    ], function (err, result) {
  })
})
module.exports = router
