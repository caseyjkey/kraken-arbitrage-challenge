// https://vscodecandothat.com/
// https://www.sohamkamani.com/blog/2015/08/21/python-nodejs-comm/
var msg = 'Jehovah Jireh - Even if you lose, you gain.';
console.log(msg);

const { StreamClient } = require("cw-sdk-node");
var spawn = require('child_process').spawn,
py = spawn('python', ['test.py']),
data = '',
dataString = '';

py.stdin.write('yo\n');

py.stdin.write('test\n');


/*Here we are saying that every time our node application receives data from the python process output stream(on 'data'), we want to convert that received data into a string and append it to the overall dataString.*/
py.stdout.on('data', function(data){
    dataString += data.toString();
  });

/*Once the stream is done (on 'end') we want to simply log the received data to the console.*/
py.stdout.on('end', function(){
console.log('Output=',dataString);
});


const client = new StreamClient({
  creds: {
    apiKey: "N8Y2MHYEPKNEPG0NUGHA", // your cw api key
    secretKey: "6gBToO/FjGEkSMlWvo6ak43GP/o7XgWfgKqhJ0a4" // your cw secret key
  },
  subscriptions: [
    "pairs:9:trades", // btc/usd pair
    "pairs:231:trades" // btc/usdt pair
  ],
  logLevel: ""
});

// Handlers for market and pair data
client.onMarketUpdate(marketData => {
    if(marketData['trades'].length !== 0) {
        /*We have to stringify the data first otherwise our python process wont recognize it*/
        

        var tradeJson = JSON.stringify(marketData);
        //console.log(tradeJson);
        //console.log("yeet");
        JSON.stringify(marketData);
        py.stdin.write(marketData['trades'][0]['price'] + ' ' + marketData['trades'][0]['amount'] + '\n');


    }
});
client.onPairUpdate(pairData => {
  console.log(pairData['trades']);
});

// Error handling
client.onError(err => {
  console.error(err);
});

// You can also listen on state changes
client.onStateChange(newState => {
  console.log("connection state changed:", newState);
});

client.onConnect(() => {
  console.info("streaming data for the next 15 seconds...");
  setTimeout(() => {
    client.disconnect();
  }, 15 * 1000);
});

client.onDisconnect(() => {
  console.log("done");
  py.stdin.end();
});

// Connect to stream
client.connect();
