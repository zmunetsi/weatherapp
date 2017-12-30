var express = require('express');
var request = require('request');
var config = require('../config');
var router = express.Router();

router.get('/', function(req, res,next) {
   res.render('index')
});

router.post('/', function(req, res,next) {
    var query     = req.body.query;

    request('http://api.wunderground.com/api/'+config.WUNDERGROUND_API_KEY+'/conditions/q/'+query+'.json', function (error, response) {

      var results  = JSON.parse(response.body);
      if(results.current_observation){
        var temp     =  results.current_observation.temp_c;
        var icon     =  results.current_observation.icon_url;
        var weather  =  results.current_observation.weather;
        var location =  results.current_observation.display_location.full;


        res.render('show',{"temp": temp, "icon": icon, "weather": weather,"location": location});
      }else{
        res.render("error", {"error": "Location not found.Please try another location.Countries outside USA type: Country/City. For USA type: state/city"})
      }


    })

});

module.exports = router;
