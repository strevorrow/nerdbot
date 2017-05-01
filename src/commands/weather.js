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

	request.get("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&appid=" + config('WEATHER_API_KEY'), function (error, response, body) {
		var weatherJson = JSON.parse(body)
		console.log(weatherJson)
		console .log(weatherJson["main"])
		console .log(weatherJson["main"]["temp"])
		var weatherText = "It is currently " + (weatherJson["main"]["temp"] * (9/5) - 459.67) + " degrees Fahrenheit"
		console.log(weatherText)
		let msg = _.defaults({
			channel: payload.channel_name,
			attachments: [{
							title: 'N/A',
							color: '#2FA44F',
							text: weatherText,
							mrkdwn_in: ['text']
							}]}, msgDefaults)
		
		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		return
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