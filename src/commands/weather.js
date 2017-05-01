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
	var weatherText = "";
	var zipCodeRegex = ^\d{5}(?:[-\s]\d{4})?$;
	var result = re.exe(zipCode);
	console.log(result);
	request.get("http://api.openweathermap.org/data/2.5/weather?zip="+zipCode+"&appid=" + config('WEATHER_API_KEY'), function (error, response, body) {
		var weatherJson = JSON.parse(body)
		weatherText = "It is currently " + (weatherJson["main"]["temp"] * (9/5) - 459.67) + " degrees Fahrenheit. " + "The dominant weather pattern is: " + weatherJson["weather"][0]["main"];
		let msg = _.defaults({
		channel: payload.channel_name,
		attachments: [{
						title: 'Weather Report :national_park:',
						color: '#2FA44F',
						text: weatherText,
						mrkdwn_in: ['text']
						}]}, msgDefaults)
	
		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		return
	});
}

module.exports = { pattern: /weather/ig, handler: handler }