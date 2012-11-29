/*jshint node:true*/
var http = require('http'),
	https = require('https'),
	url = require('url'),
	qs = require('querystring'),
	randomstring = require('randomstring-extended'),
	Requester = require('requester'),
	requester = new Requester({timeout: false});

function Decaptcher ($config) {
	this._key = $config.key;
}

Decaptcher.prototype = {
	_endpoint: 'http://www.fasttypers.org/imagepost.ashx',
	_getBase64Image: function (url, callback) {
		requester.get(url, {encoding: 'binary'}, function (data) {
			callback(new Buffer(data, 'binary').toString('base64'));
		});
	},

	getBalance: function (callback) {
		var data = {
			key: this._key,
			action: 'balance'
		};

		requester.post(
			this._endpoint, {data: data}, function (data) {
			callback(data);
		});
	},

	submitCaptcha: function (url, callback) {
		var gen_task_id = randomstring.token(12),
			data = {
				key: this._key,
				action: 'upload',
				gen_task_id: gen_task_id
			};

		if (arguments[0] instanceof Buffer) {
			data.file = arguments[0].toString('base64');
			requester.post(
				this._endpoint, {data: data}, function (data) {
				callback(data, gen_task_id);
			});
		} else {
			this._getBase64Image(url, function (base64) {
				data.file = base64;

				requester.post(
					this._endpoint, {data: data}, function (data) {
					callback(data, gen_task_id);
				});
			}.bind(this));
		}
	},

	getRefund: function (gen_task_id, callback) {
		var data = {
			key: this._key,
			action: 'refund',
			gen_task_id: gen_task_id
		};
		requester.post(
			this._endpoint, {data: data}, function (data) {
			callback(data);
		});
	}
};

module.exports = exports = Decaptcher;