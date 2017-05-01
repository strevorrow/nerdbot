'use strict'

const _ = require('lodash')
const config = require('../config')
var request = require('request');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nerdbot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
	var zipCode = payload.text.substring(8);
	console.log(zipCode);

	request.get("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&appid=" + config('WEATHER_API_KEY'), function (error, response, body) {
	  console.log('error:', error); // Print the error if one occurred 
	  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received 
	  console.log('body:', body); // Print the HTML for the Google homepage. 
	});
	
	let msg = _.defaults({
	channel: payload.channel_name,
	attachments: [{
					title: 'N/A',
					color: '#2FA44F',
					text: 'Hello.',
					mrkdwn_in: ['text']
					}]}, msgDefaults)
	
	res.set('content-type', 'application/json')
	res.status(200).json(msg)
	return
}

module.exports = { pattern: /weather/ig, handler: handler }