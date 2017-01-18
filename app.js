const
    path = require('path'),

    debug = require('debug')('gw2be-frontend:app'),
    express = require('express'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser');

let manifest = require('./public/rev-manifest.json');

const routes = require('./routes/index');

const app = express();

debug('Setting up view engine');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.asset = function (file) {
    file = file.replace(/\\/g, '/');
    if (process.env.NODE_ENV == 'development') {
        delete require.cache[require.resolve('./public/rev-manifest.json')];
        manifest = require('./public/rev-manifest.json');
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

debug('Setting up middleware');
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

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
