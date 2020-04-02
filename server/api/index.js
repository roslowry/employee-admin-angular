const express = require('express');
const router = express.Router();

router.use('/employees', require('./employees'))


router.use(function(req, res, next){
  const err = new Error('non-existent route');
  err.status = 404;
  next(err);
});

module.exports = router
