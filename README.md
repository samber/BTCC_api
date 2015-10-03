# BTCC FIX API wrapper

```sh
npm install btcc_api
```

A basic API wrapper for the BTCC Trading and Market API.

Please refer to the documentation of the [Trading API](http://btcchina.org/api-trade-documentation-en) and for the [Market API](http://btcchina.org/api-market-data-documentation-en) for all calls explained. Check out `sample.js` for a list of all possible calls and their parameters.

```js
var key = "<key>";
var secret = "<secret>";
var trade = new BTCC.Trade(key, secret);
var market = new BTCC.Market();

trade.getAccountInfo().then(console.log).catch(console.error);
market.ticker().then(console.log).catch(console.error);
```

# License

The MIT License (MIT)

Copyright (c) 2013 Samuel BERTHE contact@samuel-berthe.fr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
