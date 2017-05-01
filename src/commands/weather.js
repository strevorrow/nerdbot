'use strict'

const _ = require('lodash')
const config = require('../config')
var http = require('http');
var https = require('https');

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nerdbot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
	
	https.request(
	{
		host:"api.openweathermap.org",
		path:"/data/2.5/weather?zip=15212&appid=" + config('WEATHER_API_KEY'),
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	}, function(result){
		console.log(result);
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