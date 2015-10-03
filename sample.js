
var BTCC		= require('./lib/btcc');


var market = new BTCC.Market();

var key = "<key>";
var secret = "<secret>";
var trade = new BTCC.Trade(key, secret);



/*
* MARKET API
*/

// get all markets available
//market.ticker().then(console.log).catch(console.error);
// get only one market
//market.ticker("btccny").then(console.log).catch(console.error);

// get trades for all markets available
//market.trades().then(console.log).catch(console.error);
// get trades for only one market
//market.trades("ltcbtc").then(console.log).catch(console.error);

// get trades executed since an tradeId
//market.history(10, null, null, "ltcbtc").then(console.log).catch(console.error);

// get full orderbook of btccny (default) market
//market.orderbook().then(console.log).catch(console.error);
// get 42 orders from the btccny orderbook
//market.orderbook("btccny", 42).then(console.log).catch(console.error);



/*
* TRADE API
*/

trade.getAccountInfo().then(console.log).catch(console.error);
//trade.buyOrder("BTCCNY", 1500, 10).then(console.log).catch(console.error);
//trade.cancelOrder("BTCCNY", 2).then(console.log).catch(console.error);
//trade.getMarketDepth().then(console.log).catch(console.error);
//trade.getOrder("BTCCNY", 2, true).then(console.log).catch(console.error);
//trade.getOrders("BTCCNY", true, 100, 0, 0, true).then(console.log).catch(console.error);
//trade.getTransactions().then(console.log).catch(console.error);
//trade.sellOrder("BTCCNY", 1550, 3).then(console.log).catch(console.error);
//trade.buyIcebergOrder("BTCCNY", 1500, 10, 1).then(console.log).catch(console.error);
//trade.sellIcebergOrder("BTCCNY", 1550, 10, 1).then(console.log).catch(console.error);
//trade.getIcebergOrder("BTCCNY", 2).then(console.log).catch(console.error);
//trade.getIcebergOrders("BTCCNY", 100, 0).then(console.log).catch(console.error);
//trade.cancelIcebergOrder("BTCCNY", 2).then(console.log).catch(console.error);
//trade.buyStopOrder("BTCCNY", 1500, 1450, 10).then(console.log).catch(console.error);
//trade.sellStopOrder("BTCCNY", 1500, 1550, 10).then(console.log).catch(console.error);
//trade.getStopOrder("BTCCNY", 2).then(console.log).catch(console.error);
//trade.getStopOrders("BTCCNY").then(console.log).catch(console.error);
//trade.cancelStopOrder("BTCCNY", 2).then(console.log).catch(console.error);


