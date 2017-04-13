WebSocket = require('rwebsocket');
var fs = require('fs');

cold = 19;
confort = 23;
hot = 28;
veryhot = 32;

leds = new WebSocket("ws://localhost:42001");
leds.onopen = ledsOK;
current_humidity = null;
current_temp = null; 
first_data = true;
data_timing = 1000;
data_point = 0;

sensor = new WebSocket("ws://localhost:42004");
sensor.onmessage = readSensor;
sensor.onopen = connectionOK;
sensor.onclose = ledsFailed;
sensor.onerror  = ledsFailed;

leds.connect();
sensor.connect();

function ledsFailed(){
  try{
    leds.send("7;7;7;7;7");
  }
  catch (err){
    console.log("Can't control leds right now");
  }
}

function connectionOK(){
  sensor.send("/info");
  setInterval(function() {
    save_data();
  }, data_timing);
}

function ledsOK(){
  leds.send("/info");
  setTimeout(function(){
    display_temp(current_temp,true);
  },2000);
}

function readSensor(event){

  if(event.data !== "temphum:42004"){
    sensor_value = event.data.split(";");
    humidity = sensor_value[0];    
    temperature = sensor_value[1];
    
    display_temp(temperature,false);
    current_humidity = humidity;
    current_temp = temperature;

    if(first_data){
      save_data();
      first_data = false;
    }
  }

}

function save_data(){
  if(current_temp !== null){
    data_point = data_point + 1;
    console.log(data_point + "," + current_temp + "," + current_humidity);
    fs.appendFile("sensors.csv", data_point + "," + current_temp + "," + current_humidity + "\n", function(err){
      if(err) {
        return console.log(err);
      }
    });
    console.log("Saving sensors.csv");
  }
}

function display_temp(temp,reset){
  var temp_icon;
  try{
    if((temp != current_temp) || (reset)){

      if(temp < cold){

       leds.send("4");
     }

     if(temp >= cold && temp < confort){

      leds.send("4;4");

    }

    if(temp >= confort && temp < hot){

     leds.send("5;5;5");

   }

   if(temp >= hot && temp < veryhot){

    leds.send("6;6;6;6");

  }

  if(temp >= veryhot){

    leds.send("2;2;2;2;2");

  }
}
} catch (err){
  //console.log("Failed to send to leds");
}
}
