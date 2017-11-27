var express = require('express');
var router = express.Router();
var getItemstats = require('gw2-itemstats').getItemstats;

var cache = new Map();
var filter = function(item) {
    // we only care for level 80 ascended/exotic items
    return item.level === 80 && ['Ascended', 'Exotic'].indexOf(item.rarity) !== -1
};

// build the manifest
router.get('/api/itemstats', function (req, res, next) {
    var language = req.query.lang || 'en';
    res.header('Content-Language', language);

    getItemstats(language, {
        cache: cache,
        filter: filter
    }).then(function(stats) {
        res.json(stats);
    }).catch(function(error) {
        res.status(500).end(error.toString());
    });
});


module.exports = router;
