NodeJS Client Example for temperature / sensor and leds
---------------------------------------------------------
This example save data from DHT11 into a csv file and if there is leds display    
a bar depending on temperature.

This example shows that you can reuse your javascript code inside a client
with little modifications, so you can prototype with html files and then transfer it   
into a headless client.

I'm using rwebsocket to manage reconnection, all the alternative failed to works (probably because
i rush thought its) or use syntax that makes them incompatible.

# Build
Go to [temphum github](https://github.com/madnerdorg/temphum) to learn how to build the device.
Go to [leds github](https://github.com/madnerdorg/leds) to learn how to build the device.
# Install
You will need nodejs
```
npm i rwebsocket -S
```

# Usage
Terminal
```
node temphum.js
```

/etc/rc.local
```
cd /dir;/usr/local/bin/node temphum.js
```

# Issues
It seems that the client won't start, if no network is present.    
If you want to use it networkless, you need to connect it first (using your phone for ex.)    
I need to investigate this but this will not be easy to test this without network   
I have a console cable so it should do the trick    
