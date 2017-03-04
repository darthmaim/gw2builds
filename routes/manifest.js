var express = require('express');
var router = express.Router();

// build the manifest
router.get('/manifest.json', function (req, res) {
    var manifest = req.app.locals.manifest;

    manifest.icons = [144,192,512].map(function(size) {
        return {
            src: req.app.locals.img('logo/' + size + '.png'),
            sizes: size + 'x' + size,
            type: 'image/png'
        };
    });

    res.json(manifest);
});

module.exports = router;
