'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nerdbot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
	console.log(payload.text);
	if(payload.text.indexOf("hi") > -1)
	{
		let msg = _.defaults({
		channel: payload.channel_name,
		attachments: {
						title: 'N/A',
						color: '#2FA44F',
						text: 'Hello.',
						mrkdwn_in: ['text']
						}}, msgDefaults)
		
		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		console.log(msg);
		console.log(res);
		return
	}
	else{
		let msg = _.defaults({
		channel: payload.channel_name,
		attachments: {
						title: 'N/A',
						color: '#2FA44F',
						text: 'Good bye.',
						mrkdwn_in: ['text']
						}}, msgDefaults)

		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		console.log(msg);
		console.log(res);
		return
	}
}

module.exports = { pattern: /response/ig, handler: handler }