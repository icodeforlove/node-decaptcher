## node-decaptcher
A simple decaptcher wrapper

## installation

    $ npm install decaptcher

## super simple to use

submit an image
```javascript
var Decaptcher = require('decaptcher'),
	decaptcher = new Decaptcher({key: /* key */});

decaptcher.submitCaptcha(/* image URL or Buffer */, function (decoded, gen_task_id) {
	console.log(arguments);
});
```

get a refund
```javascript
decaptcher.getRefund(/* gen_task_id */, function (data) {
	
});
```

get your balance
```javascript
decaptcher.getBalance(function (data) {
	
});
```
