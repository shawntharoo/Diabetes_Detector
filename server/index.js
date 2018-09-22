var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);
var timeseries = require('timeseries-analysis');
var cors = require('cors');

var dataModelReader = require('./datamodel/reader');

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.use(cors());
app.use(function (req, res, next) {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});
var router = express.Router();

var port = 3001;
server.listen(port);
console.info('Magic happening on port ' + port);

/**
 * User Activities
 */
router.route('/prediction').post(function (req, res) {
	let all_data = req.body;
	var t = new timeseries.main(all_data);
	var degree = Math.round(all_data.length / 2);
	// The sin wave
	// var t = new timeseries.main(timeseries.adapter.sin({cycles:4}));
	//var forecastDatapoint = 14;
	var coeffs = t.ARMaxEntropy({ degree: degree, data: t.data.slice(0, all_data.length) });

	var forecast = 0;
	for (var i = 0; i < coeffs.length; i++) {
		forecast -= t.data[t.data.length - 1 - i][1] * coeffs[i];
	}
	console.log('forecast', forecast);
	return res.status(200).send({ forecast: forecast });
});

/**
 * Test for 200 response.  Useful when setting up Twilio callback.
 */
router.route('/test').get(function (req, res) {
	return res.status(200).send({ 'connected': true });
});
router.route('/getcomplication').post(dataModelReader.reader);
/**
 * Prefix all router calls with 'api'
 */
app.use('/api', router);
