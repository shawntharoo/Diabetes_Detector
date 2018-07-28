var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var timeseries = require("timeseries-analysis");
var cors = require('cors');

app.use(bodyParser.json({}));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
var router = express.Router();

var port = 3001;
server.listen(port);
console.log("Magic happening on port " + port);

/**
 * User Activities
 */
router.route('/prediction').post(function (req, res) {
    console.log(req.body);
    return res.status(200).send(req.body);
});

/**
 * Test for 200 response.  Useful when setting up Twilio callback.
 */
router.route('/test').get(function (req, res) {
    return res.status(200).send({ "connected": true });
});


/**
 * Prefix all router calls with 'api'
 */
app.use('/api', router);
