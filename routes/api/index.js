var router = require('express').Router();
const test = require("../../controllers").test;
router.use('/', require('./fileUpload'));

router.get('/country', function (req, res, next) {
  test.testFun(req, res, next);
});

router.use(function(err, req, res, next){
  if(err.name === 'ValidationError'){
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function(errors, key){
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

module.exports = router;