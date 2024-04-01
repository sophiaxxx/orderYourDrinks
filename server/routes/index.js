var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressXsp' });
});

router.get('/chu/personal', function(req,res,next){
  res.send(req.query)
})

router.post('/chu/favorite', function(req, res, next){
  res.send(req.body)
})

router.get('/chu/user', function(req, res, next) {
  console.log('req: ',req)
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})

module.exports = router;