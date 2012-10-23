var http = require('http'),
	https = require('https'),
	url = require('url'),
	qs = require('querystring'),
	randomstring = require('randomstring-extended'),
	Request = require('request'),
	request = new Request();

function Decaptcher ($config) {
	this._key = $config.key;
	this._endpoint = 'http://www.fasttypers.org/imagepost.ashx';
}

Decaptcher.prototype = {
	_getBase64Image: function (url, callback) {
		request.get(url, {encoding: 'binary'}, function (data) {
			callback(new Buffer(data, 'binary').toString('base64'));
		});
	},

	getBalance: function (callback) {
		var data = {
			key: this._key,
			action: 'balance'
		};

		request.post(
			this._endpoint, {data: data}, function (data) {
			callback(data);
		});
	},

	submitCaptcha: function (url, callback) {

		this._getBase64Image(url, function (base64) {
			var gen_task_id = randomstring.token(12),
				data = {
					key: this._key,
					action: 'upload',
					file: base64,
					gen_task_id: gen_task_id
				};
			
			request.post(
				this._endpoint, {data: data}, function (data) {
				callback(data, gen_task_id);
			});
		}.bind(this));
	},

	getRefund: function (gen_task_id, callback) {
		var data = {
			key: this._key,
			action: 'refund',
			gen_task_id: gen_task_id
		};
		request.post(
			this._endpoint, {data: data}, function (data) {
			callback(data);
		});
	}
};

module.exports = exports = Decaptcher;