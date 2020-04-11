var router = require('express').Router();
const authentication = require("../../middlewares/authentication");
const cryptography = require("../../middlewares/cryptography");

const test = require("../../controllers").test;
const scanIdentityController = require("../../controllers").scanIdentityController;

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    res.status(200).json("Get API");
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
});

// Scanning identity
router.get(
  "/scan/:identitycode",
  // authentication.EnsureAndVerifyToken,
  cryptography.DecryptPayload,
  DebuggerMiddleware,
  function (req, res, next) {
    scanIdentityController.validateIdentity(req, res, next);
  },
  cryptography.EncryptPayload
);

// Mobile Dashboard Entity
router.get(
  "/dashboardEntity",
  // authentication.EnsureAndVerifyToken,
  cryptography.DecryptPayload,
  DebuggerMiddleware,
  function (req, res, next) {
    scanIdentityController.getDashboardEntity(req, res, next);
  },
  cryptography.EncryptPayload
);

router.get('/country', function (req, res, next) {
  test.testFun(req, res, next);
});

router.use(function (err, req, res, next) {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce(function (errors, key) {
        errors[key] = err.errors[key].message;

        return errors;
      }, {})
    });
  }

  return next(err);
});

/**
 * This is used to debug the application
 *
 * @param  {object} req  the request object
 * @param  {object} res  the response object
 * @param  {object} next the next middleware
 * @return {void}
 */
function DebuggerMiddleware(req, res, next) {
  //if (env !== 'production') {
  console.log(
    "Request URL :" + req.protocol + "://" + req.get("host") + req.originalUrl
  );
  console.log("Request method  :" + req.method);
  console.log("Request body :", JSON.stringify(req.body, null, 2));
  //}
  next();
}

module.exports = router;