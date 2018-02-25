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
  var ticket = 0
  waterfall([
    function(callback) {
      var  sql = 'SELECT ticket FROM train WHERE number LIKE \''+req.body.number+'\''
      //查
      connection.query(sql,function (err, result) {
              if(err){
                console.log('[SELECT ERROR] - ',err.message)
                callback(null, 0)
                return
              }

              ticket = result[0].ticket
              console.log(ticket)
              callback(null, 1)
          })
        },
    function(arg, callback) {
      if(arg > 0) {
        var  sql = 'SELECT * FROM user'+req.body.id+' WHERE number LIKE \''+req.body.number+'\' AND state = 1'
        connection.query(sql,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message)
                  callback(null, 0)
                  return
                }
                if(result.length > 0) {
                  callback(null, 0)
                }
                else{
                  callback(null, 1)
                }
            })
          }
          else {
             callback(null, 0)
          }

        },
    function(arg1, callback) {
      if(arg1 > 0) {
        var  sql = 'INSERT INTO user'+req.body.id+'(id, number, title, time, type, state) VALUES(NULL,\''+req.body.number+'\',\''+req.body.title+'\',\''+req.body.time+'\',\''+req.body.type+'\', 1)'
        connection.query(sql,function (err, result) {
                if(err){
                  console.log('[SELECT ERROR] - ',err.message)
                  callback(null, 0)
                  return
                }
                ticket = ticket - 1
                callback(null, 1)

            })
          }
        else {
          callback(null, 0)
          }
        },
        function(arg2, callback) {
          if(arg2 > 0) {
            var  sql = 'UPDATE train SET ticket ='+ticket+' WHERE number LIKE \''+req.body.number+'\''
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
      function(arg3, callback) {
          res.json({"message": arg3})
          callback(null)
        }
      ], function (err, result) {
  })
})
module.exports = router
