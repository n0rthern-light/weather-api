var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/getweather', function(req,res,next){
  res.status(200);
  res.send(req.app.locals.weather_history);
})

module.exports = router;
