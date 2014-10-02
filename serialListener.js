
module.exports = serialListener;

var app = require('./app');
var portConfig = require('./portConfig.json');

/*
var http = require('http');
var httpServer = http.createServer();
var io = require('socket.io').listen(http);

	io.on('connection', function (socket) {
			console.log('DI connection here');
		});
httpServer.listen(3001);
*/
var SerialPort = require("serialport").SerialPort

console.log('ports '+ portConfig.stepper.port +" "+ portConfig.windSpeed.port + " " + portConfig.measurement.port);

   
   PAserialPort = new SerialPort(portConfig.stepper.port, {
 
		// test rig
		// baudrate: 9600,
		
		// wind tower
		baudrate: portConfig.stepper.port.baudrate,

	});
	  
   WSserialPort = new SerialPort(portConfig.windSpeed.port, {
		baudrate: portConfig.windSpeed.baudrate,
	});
	
	DIserialPort = new SerialPort(portConfig.measurement.port, {
		baudrate: portConfig.measurement.baudrate,
	});


function sleep(time, callback) {
// serialListener.prototype.sleep(time, callback) {
    var stop = new Date().getTime();
    while(new Date().getTime() < stop + time) {
        ;
    }
    callback();
};

var _comPort = '';

var socketServer;
var socketio = require('socket.io');
socketServer = socketio.listen(app, true);

function serialListener(ComPort)
{	//
	//
	//http://www.barryvandam.com/node-js-communicating-with-arduino/ 
	//copied from the server.js file
	var receivedData = "";
    var sendData = "";
	var delimiter = "\n";
	var comPort = ComPort;
	_comPort = comPort;
	
 console.log('serialListenerInit called with comPort:'+comPort);
 var http = require('http');
var httpServer = http.createServer();
var io = require('socket.io').listen(1337);

	
// httpServer.listen(1337);

console.log('setup connection now');

io.sockets.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
	io.on('sliderval', function(data) {
		console.log('DataInput : '+data);
	});
		io.on('updateData', function(data) {
		console.log('DataInput UPDATE: '+data);
	});
		io.emit('updateData', {
			dataSource: "somethig",
			dataInputData: "something else \n"
		});

 	
 
   DIserialPort.on("open", function () {
		console.log('serialListener.DIserialPort.on Open ' + comPort);

        sleep(2000, function() {
		});
	});
    WSserialPort.on("open", function () {
		console.log('serialListener.WSserialPort.on Open ' + comPort);

		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
		});
	});

	
    PAserialPort.on("open", function () {
		console.log('serialListener.PAserialPort.on Open ' + comPort);
		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage

        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });

  }); 
 
 var sendData = '';
 var receivedData = '';
    DIserialPort.on('data', function(data) {
	//	console.log('DIserialPort on data called');
         receivedData += data.toString();
 console.log(' DIserailPort data received: ' + receivedData )
          if (receivedData .indexOf('{') >= 0 && receivedData .indexOf('}') >= 0) {
			sendData = receivedData.substring(receivedData.indexOf('{'), receivedData.indexOf('}')+1);
			receivedData = '';
//		   console.log(' DIserailPort Full data received: ' + sendData )

         }
         // send the incoming data to browser with websockets.
      if (sendData.length > 0 ) {
			console.log('SEND update data : '+sendData);
			io.emit('updateData', sendData);
			sendData = "";
		};
	   

		//	dataSource: "dataInputData",
		//	dataInputData: receivedData
		// });

		;
	}); 
 
 
    //######Version one to receive data
        // serialPortADC.on('data', function(data) {
		// console.log('ADC_data received: ' + data);
        // });
        
    //######Version two to receive data with "x" as a delimiter 
    WSserialPort.on('data', function(data) {
//		console.log('serialPort on data called');
         receivedData += data.toString();
   //   if (receivedData .indexOf('x') >= 0) {
   //    sendData = receivedData .substring(receivedData .indexOf('x') + 1) ;
    //   receivedData = '';
    // }
     // // send the incoming data to browser with websockets.
   // socketServer.emit('update', sendData);
   
 //  console.log(comPort+' data received: ' + receivedData + '\n');
  }); 
  
  
      PAserialPort.on('data', function(data) {
//		console.log('serialPort on data called');
         receivedData += data.toString();
	//	 console.log(comPort + ' data recieved: ' + data.toString());
  //  console.log(comPort+' data received: ' + receivedData + '\n');
  }); 
   

};


serialListener.doSomething = function() {
	console.log('serialListener.doSomething here');
};

serialListener.write = function( id, value ) {
	console.log('serialListener.write COM: ');

     sleep(200, function() {
    }); 
	
	console.log('serialListener.write COM: ');
	console.log('serialListener write value: '+value);
	if( id === 'w' ) {
		WSserialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results from windSpeed ' + results);
		});
	} else if (id === 'PA') {
		console.log('PAserialListener.write '+value);

		PAserialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results ' + results);
		});
	} else if (id === 'DI') {
		console.log('DIserialListener.write '+value);

		DIserialPort.write(value, function(err, results) {
			console.log('DI_err ' + err);
			console.log('DI_results ' + results);
		});
	} else {
		console.log('bad id '+id);
	};
	

};

