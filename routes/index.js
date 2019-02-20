var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

const weatherData = [
  {
    date: '20.10',
    temp: '7.4'
  },
  {
    date: '21.10',
    temp: '8.4'
  },
  {
    date: '22.10',
    temp: '9.4'
  },
  {
    date: '23.10',
    temp: '10.4'
  }
];

router.get('/getweather', function(req,res,next){
  res.status(200);
  res.send(weatherData);
})

module.exports = router;
