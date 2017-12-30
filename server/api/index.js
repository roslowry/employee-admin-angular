const express = require('express');
const router = express.Router();

router.use('/employees', require('./employees'))


router.use(function(req, res, next){
  const err = new Error('non-existent route');
  err.status = 404;
  // throw err
  next(err);
})

module.exports = router


// update forms with values;
// initialize all state with empty state;
// update individual fields;
// change route names for the file...
// change the form validations using react forms,

// make form validations for submit...


// first thing's first....

/*
delete buttons




THEN
edit button
*/
