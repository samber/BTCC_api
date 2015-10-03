
// core deps
var crypto		= require('crypto');
var querystring		= require('querystring');

// package modules
var request		= require('./request');


var BTCCTrade = function (access_key, secret_key) {
    _auth.access_key = access_key;
    _auth.secret_key = secret_key;
};


var _auth = {};


var _request = function (api_method, params) {
    if (params == null)
	params = [];

    /*
     * cf. https://github.com/askmike/btcchina
    */
    var tonce = new Date() * 1000;
    var args = {
	tonce: tonce,
	accesskey: _auth.access_key,
	requestmethod: 'post',
	id: 1,
	method: api_method,
	params: params.join('~'), // we need commas here in the querystring
	// hacky workaround to perserve them
    };
    var qs = querystring.stringify(args).replace('~', ',');

    var signer = crypto.createHmac('sha1', _auth.secret_key);
    var hmac = signer.update(qs).digest('hex');
    var signature = new Buffer(_auth.access_key + ':' + hmac).toString('base64');

    var host		= "https://api.btcchina.com",
	method		= "POST",
	endpoint	= "/api_trade_v1.php";

    var body = JSON.stringify({
	method: args.method,
	params: params,
	id: args.id
    }, null, 4);

    var headers		= {
	'Content-Length': body.length,
	'Authorization': 'Basic ' + signature,
	'Json-Rpc-Tonce': tonce,
	'User-Agent': 'Mozilla/4.0 (compatible; BTCchina node.js client)'
    };

    return request(method, host + endpoint, body, headers);
};


// Get account infos
BTCCTrade.prototype.getAccountInfo = function (market, price, amount) {
    var params = [];
    return _request("getAccountInfo", params);
};

// Place a limit order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- price (optional): null (default, market order)
//	- amount
BTCCTrade.prototype.buyOrder = function (market, price, amount) {
    var params = [];

    params.push(price.toString());
    params.push(amount.toString());
    if (market != null)
	params.push(market.toUpperCase());

    return _request("buyOrder2", params);
};

// Cancel an order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order_id
BTCCTrade.prototype.cancelOrder = function (market, order_id) {
    var params = [];

    params.push(order_id);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("cancelOrder", params);
};

// Get market depth
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- limit (optional): number of results
BTCCTrade.prototype.getMarketDepth = function (market, limit) {
    if (limit == null)
	limit = 10;
    if (market == null)
	market = "BTCCNY";
    else
	market = market.toUpperCase();

    return _request("getMarketDepth2", [limit, market]);
};

// Get order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order id
//	- withDetail (optional, default true)
BTCCTrade.prototype.getOrder = function (market, order_id, withDetail) {
    if (withDetail == null)
	withDetail = true;
    if (market == null)
	market = "BTCCNY";
    else
	market = market.toUpperCase();

    return _request("getOrder", [order_id, market, withDetail]);
};

// Get orders
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- openonly (optional, default true)
//	- limit (optional): number of results
//	- offset (optional): pagination
//	- since (optional): timestamp to start
//	- withDetail (optional, default true)
BTCCTrade.prototype.getOrders = function (market, openonly, limit, offset, since, withdetail) {
    if (withDetail == null)
	withDetail = true;
    if (market == null)
	market = "ALL";
    else
	market = market.toUpperCase();
    if (openonly == null)
	openonly = true;
    if (limit == null)
	limit = 1000;
    if (offset == null)
	offset = 0;
    if (since = null)
	since = 0;

    return _request("getOrders", [openonly, market, limit, offset, since, withDetail]);
};

// Get transactions
// @params:
//	- type (optional): all (default), fundbtc, withdrawbtc, withdrawbtcfee, refundbtc, fundltc, withdrawltc, withdrawltcfee, refundltc, fundmoney, withdrawmoney, withdrawmoneyfee, refundmoney, buybtc, sellbtc, buyltc, sellltc, tradefee,  rebate
//	- limit (optional): number of results
//	- offset (optional): pagination
//	- since (optional): timestamp to start
//      - sincetype (optional): "time" return list or records starting from unix timestamp
BTCCTrade.prototype.getTransactions = function (type, limit, offset, since, sincetype) {
    if (type == null)
	type = "all";
    if (limit == null)
	limit = 10;
    if (offset == null)
	offset = 0;
    if (since = null)
	since = 0;
    if (sincetype = null)
	sincetype = "time";


    return _request("getTransactions", [type, limit, offset, since, sincetype]);
};

// Place a limit order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- price (optional): null (default, market order)
//	- amount
BTCCTrade.prototype.sellOrder = function (market, price, amount) {
    var params = [];

    params.push(price.toString());
    params.push(amount.toString());
    if (market != null)
	params.push(market.toUpperCase());

    return _request("sellOrder2", params);
};

// Place a limit iceberg order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- price (optional): null (default, market order)
//	- amount
//	- disclosed_amount
//	- variance (optional, default: 0)
BTCCTrade.prototype.buyIcebergOrder = function (market, price, amount, disclosed_amount, variance) {
    var params = [];

    params.push(price);
    params.push(amount);
    if (variance == null)
	variance = 0;
    params.push(variance);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("buyIcebergOrder", params);
};

// Place a limit iceberg order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- price (optional): null (default, market order)
//	- amount
//	- disclosed_amount
//	- variance (optional, default: 0)
BTCCTrade.prototype.sellIcebergOrder = function (market, price, amount, disclosed_amount, variance) {
    var params = [];

    params.push(price);
    params.push(amount);
    params.push(disclosed_amount);
    if (variance == null)
	variance = 0;
    params.push(variance);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("sellIcebergOrder", params);
};

// Get iceberg order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order id
BTCCTrade.prototype.getIcebergOrder = function (market, order_id) {
    if (market == null)
	market = "BTCCNY";
    else
	market = market.toUpperCase();

    return _request("getIcebergOrder", [order_id, market]);
};

// Get iceberg orders
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- limit (optional): number of results
//	- offset (optional): pagination
BTCCTrade.prototype.getIcebergsOrders = function (market, limit, offset) {
    if (market == null)
	market = "ALL";
    else
	market = market.toUpperCase();
    if (limit == null)
	limit = 1000;
    if (offset == null)
	offset = 0;

    return _request("getIcebergOrders", [limit, offset, market]);
};

// Cancel an iceberg order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order_id
BTCCTrade.prototype.cancelIcebergOrder = function (market, order_id) {
    var params = [];

    params.push(order_id);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("cancelIcebergOrder", params);
};

// Place a stop order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- stop_price (optional): null (default: can be replaced by trailing_amount or trailing_percentage)
//	- price
//	- amount
//	- trailing_amount (optional): null (default: can be replaced by stop_price or trailing_percentage)
//	- trailing_percentage (optional): null (default: can be replaced by stop_price or trailing_amount)
BTCCTrade.prototype.buyStopOrder = function (market, stop_price, price, amount, trailing_amount, trailing_percentage) {
    var params = [];

    params.push(stop_price);
    params.push(price);
    params.push(amount);
    params.push(trailing_amount);
    params.push(trailing_percentage);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("buyStopOrder", params);
};

// Place a stop order at a fixed or market price
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- stop_price (optional): null (default: can be replaced by trailing_amount or trailing_percentage)
//	- price
//	- amount
//	- trailing_amount (optional): null (default: can be replaced by stop_price or trailing_percentage)
//	- trailing_percentage (optional): null (default: can be replaced by stop_price or trailing_amount)
BTCCTrade.prototype.sellStopOrder = function (market, stop_price, price, amount, trailing_amount, trailing_percentage) {
    var params = [];

    params.push(stop_price);
    params.push(price);
    params.push(amount);
    params.push(trailing_amount);
    params.push(trailing_percentage);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("sellStopOrder", params);
};

// Get stop order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order id
BTCCTrade.prototype.getStopOrder = function (market, order_id) {
    if (market == null)
	market = "BTCCNY";
    else
	market = market.toUpperCase();

    return _request("getStopOrder", [order_id, market]);
};

// Get stop orders
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- status (optional): all (default), open, closed, canceled or error
//	- type (optional): all (default), ask or bid
//	- stop_price (optional)
//	- limit (optional): number of results
//	- offset (optional): pagination
BTCCTrade.prototype.getStopOrders = function (market, status, type, stop_price, limit, offset) {
    if (market == null)
	market = "ALL";
    else
	market = market.toUpperCase();
    if (status == null)
	status = "all";
    if (type == null)
	type = "all";
    if (stop_price == null)
	stop_price = 0;
    if (limit == null)
	limit = 1000;
    if (offset == null)
	offset = 0;

    return _request("getStopOrders", [status, type, stop_price, limit, offset, market]);
};

// Cancel a stop order
// @params:
//	- market (optional): BTCCNY (default), LTCCNY or LTCBTC
//	- order_id
BTCCTrade.prototype.cancelStopOrder = function (market, order_id) {
    var params = [];

    params.push(order_id);
    if (market != null)
	params.push(market.toUpperCase());

    return _request("cancelStopOrder", params);
};



module.exports = BTCCTrade;
