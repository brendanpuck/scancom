var serialport = require("serialport");
var SerialPort = serialport.SerialPort;

var prompt = require('prompt');

var serialPort = new SerialPort("/dev/ttyUSB0", {
  baudRate: 115200,
  parser: serialport.parsers.raw
});

serialPort.on("data", function(data) {
  console.log('' + data);
});

var command;
var result;

function getCommand() {
  setTimeout(function() {
    prompt.get('message', function(err, result) {
        command = result.message;
        write();
        getCommand();
    })

  }, 500);
};

function write() {
  serialPort.open(function() {
    if (serialPort.isOpen() == true) {
      serialPort.write(command + '\r');
    } else {
      console.log("Port not open");
    }
  });
};

getCommand();
