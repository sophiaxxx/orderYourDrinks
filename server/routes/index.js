var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ExpressXsp' });
});

router.get('/api/personal', function(req,res,next){
  res.send(req.query)
})

router.post('/api/favorite', function(req, res, next){
  res.send(req.body)
})

router.get('/api/user', function(req, res, next) {
  console.log('req: ',req)
  res.send({
    name: 'kim',
    address: '广州海珠区',
  })
})

module.exports = router;