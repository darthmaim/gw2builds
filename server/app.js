const
    path = require('path'),

    debug = require('debug')('gw2be-frontend:app'),
    express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    compression = require('compression'),

    crypto = require('crypto'),
    fs = require('fs');

let manifest = require('../public/rev-manifest.json');

const routes = require('./routes/index');

const app = express();

function publicPath(file) {
    return path.join.apply(null, [__dirname, '..', 'public', file || '']);
}

debug('Setting up view engine');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.asset = function (file) {
    file = file.replace(/\\/g, '/');
    if (process.env.NODE_ENV == 'development') {
        delete require.cache[require.resolve('../public/rev-manifest.json')];
        manifest = require('../public/rev-manifest.json');
    }
    if (file in manifest) {
        return manifest[file];
    }
    return file;
};
app.locals.css = function (file) {
    return app.locals.asset(path.join('css', file));
};
app.locals.js = function (file) {
    return app.locals.asset(path.join('js', file));
};
app.locals.img = function (file) {
    return app.locals.asset(path.join('img', file));
};
app.locals.manifest = require('../assets/manifest.json');
app.locals.google = {
    analytics: process.env.GOOGLE_ANALYTICS_TRACKING_ID || false
};

const integrityCache = {};
app.locals.integrity = function (file) {
    return integrityCache[file] ||
        (integrityCache[file] = 'sha256-' + crypto.createHash('sha256').update(fs.readFileSync(publicPath(file))).digest('base64'));
};

debug('Setting up middleware');
app.disable('x-powered-by');
app.use(compression());
app.use(favicon(publicPath('favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(publicPath(), { maxAge: '2y', immutable: true, setHeaders: (res, path) => {
    const filename = path.split('/').splice(-1)[0];
    if(['sw.js', 'rev-manifest.json'].indexOf(filename) !== -1) {
        res.setHeader('Cache-Control', 'public, max-age=3600');
    }
}}));

debug('Setting up routes');
app.use('/', routes);

// Catch 404 and forward to error handler
debug('Setting up 404 handler');
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handlers
debug('Setting up error handlers');
if (app.get('env') === 'development') {
    // Development error handler, will print stacktrace
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
} else {
    // Production error handler, no stacktraces leaked to user
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
}

module.exports = app;
