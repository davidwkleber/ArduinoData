
module.exports = serialListener;

var SerialPort = require("serialport").SerialPort

 //   serialPortBlink = new SerialPort('COM3', {
 //       baudrate: 9600, 

 //   });
    
    //    serialPortADC = new SerialPort('COM6', {
    //    baudrate: 9600, 

   // });
   
   PAserialPort = new SerialPort('COM7', {
		// test rig
		// baudrate: 9600,
		// wind tower
		baudrate: 115200,

	});
	  
   _serialPort = new SerialPort('COM3', {
		baudrate: 9600,
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
 
 
    _serialPort.on("open", function () {
		console.log('serialListener.serialPortBlink.on Open ' + comPort);

		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage
	
        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
		});
	});

	
    PAserialPort.on("open", function () {
		console.log('serialListener.serialPortBlink.on Open ' + comPort);
		//
		//
		//My guess is, that the function sends to fast after the port opening. The uController is still in the reset stage

        sleep(2000, function() {
    // executes after two second, and blocks the thread, should be avoided. maybe we find another solution
    });

  }); 
 
 
 
 
    //######Version one to receive data
        // serialPortADC.on('data', function(data) {
		// console.log('ADC_data received: ' + data);
        // });
        
    //######Version two to receive data with "x" as a delimiter 
    _serialPort.on('data', function(data) {
		console.log('serialPort on data called');
         receivedData += data.toString();
   //   if (receivedData .indexOf('x') >= 0) {
   //    sendData = receivedData .substring(receivedData .indexOf('x') + 1) ;
    //   receivedData = '';
    // }
     // // send the incoming data to browser with websockets.
   // socketServer.emit('update', sendData);
   
   console.log(comPort+' data received: ' + receivedData + '\n');
  }); 
      PAserialPort.on('data', function(data) {
		console.log('serialPort on data called');
         receivedData += data.toString();
		 console.log(comPort + ' data recieved: ' + data.toString());
  // console.log(comPort+' data received: ' + receivedData + '\n');
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
		_serialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results from windSpeed ' + results);
		});
	} else if (id === 'PA') {
		console.log('PAserialListener.write '+value);

		PAserialPort.write(value, function(err, results) {
			console.log('Blink_err ' + err);
			console.log('Blink_results ' + results);
		});
	} else {
		console.log('bad id '+id);
	};
	

};

