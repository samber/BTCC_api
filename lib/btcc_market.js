
// core deps
var crypto		= require('crypto');
var querystring		= require('querystring');

// package modules
var request		= require('./request');


var BTCCMarket = function () {
};


var _request = function (path, params) {
    if (params == null)
	params = {};

    var host		= "https://data.btcchina.com",
	method		= "GET",
	endpoint	= "/data",
	query		= "?" + querystring.stringify(params);

    return request(method, host + endpoint + path + query, null, null);
};


// ticker
// @params:
//	- market (optional): btccny, ltccny or ltcbtc
BTCCMarket.prototype.ticker = function (market) {
    if (market == null)
	market = "all";

    return _request("/ticker", {
	market: market
    });
};

// last 24h trades records
// @params:
//	- market (optional): btccny, ltccny or ltcbtc
BTCCMarket.prototype.trades = function (market) {
    return _request("/trades", {
	market: market
    });
};

// list of trades records from the beginning
// @params:
//	- limit (optional): number of results
//	- since (optional): list of trades records starting from a tradeId
//	- sincetype (optional): "time" return list or records starting from unix timestamp
//	- market (optional): btccny, ltccny or ltcbtc
BTCCMarket.prototype.history = function (limit, since, sincetype, market) {
    return _request("/historydata", {
	limit: limit,
	since: since,
	sincetype: sincetype,
	market: market
    });
};

// orderbook for a market
// @params:
//	- market (optional): btccny (default), ltccny or ltcbtc
//	- limit (optional): number of results
BTCCMarket.prototype.orderbook = function (market, limit) {
    if (market == null)
	market = "btccny";

    return _request("/historydata", {
	market: market,
	limit: limit
    });
};


module.exports = BTCCMarket;
