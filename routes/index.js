var express = require('express');
var request = require('request');
var config = require('../config');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res,next) {

  res.render('index',{"title": "Weather App"})

})

module.exports = router;
