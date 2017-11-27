var express = require('express');
var router = express.Router();

router.use(require('./manifest'));
router.use(require('./itemstats'));

/* GET home page. */
router.get('*', function (req, res, next) {
    res.render('index');
});

module.exports = router;
