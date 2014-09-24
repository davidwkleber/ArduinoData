//
// module for setting Wind Speed of the wind fan
//
var DLserialListener = require('../lib/serialListener');

DLserialListener('COM3');


var express = require('express');
var router = express.Router();

// middleware specific to this route, logs timestamps
router.use(function timeLog(req, res, next){
	console.log('dummyLoad Time: ', Date.now());
	next();
})

// define the home page route
router.get('/', function(req, res){
console.log('dummyLoad get');
 	res.redirect('index');
})

router.post('/', function(req, res, next){

console.log('dummyLoad post');
console.log('dummyLoad value in post: ', req.param('dummyLoadValue', null));
	var dummyLoadValue = req.param('dummyLoadValue', null);
	var serialCallValue = Math.floor(dummyLoadValue*0.625);
		console.log(' rounded wind speed: '+serialCallValue);

	if( serialCallValue < 0 ) {
		serialCallValue = 0;
	} else if ( serialCallValue > 100 ) {
		serialCallValue = 100;
	}
	console.log('dummyLoad serialCallValue: '+serialCallValue);
	// for test rig, send r for blinkey light
//	var serialCall = 'r' + serialCallValue + 'x\n';
	// for real wind chamber fan, if %, start with F for forward and send % in delimeter
	var serialCall = 'F' + serialCallValue + '%\n';

		console.log('dummyLoad serialCall: '+serialCall);
		res.render('index', {title: 'Wind Lab', seeValue: dummyLoadValue });
 
			console.log('dummyLoad rendered index: '+dummyLoadValue);

	DLserialListener.write('w', serialCall);
	
			console.log('dummyLoad serialCall done: '+serialCall);

   
})

router.put('/', function(req, res, next){
	var spinnerValue = req.body.value;
	res.seeValue = req.body.value;
	res.redirect('index');
})

router.get('/about', function(req, res){
	res.send('wind speed About page');
})

module.exports = router;

	