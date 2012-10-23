## node-request
A simple decaptcher wrapper

## installation

    $ npm install git://github.com/icodeforlove/node-decaptcher.git

## super simple to use

submit an image
```javascript
var Decaptcher = require('decaptcher'),
	decaptcher = new Decaptcher({key: /* key */});

decaptcher.submitCaptcha(/* IMAGE URL */, function (decoded, gen_task_id) {
	console.log(arguments);
});
```

get a refund
```javascript
decaptcher.getRefund(/* gen_task_id */, function (data) {
	
}
```

get your balance
```javascript
decaptcher.getBalance(function (data) {
	
})
```