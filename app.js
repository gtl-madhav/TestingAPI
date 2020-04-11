var express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    errorhandler = require('errorhandler');


var isProduction = process.env.NODE_ENV === 'production';

console.log(process.env.NODE_ENV);

var app = express();
var http = require('http').Server(app);

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (!isProduction) {
    app.use(errorhandler());
}

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (!isProduction) {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);

        res.json({
            'errors': {
                message: err.message,
                error: err
            }
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        'errors': {
            message: err.message,
            error: {}
        }
    });
});

console.log("asdfasdfasdfasdfasdfasdfasdf",process.env.PORT)

var server = http.listen(process.env.PORT || 3000, function () {
});

