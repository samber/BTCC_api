
// 3rd party deps
var request		= require('request-promise');


module.exports = function (method, url, body, headers) {
    return request({
	url: url,
	method: method,
	body: body,
	headers: headers
    }).then(function (buffer) {
	return JSON.parse(buffer);
    });
};
