'use strict'

const _ = require('lodash')
const config = require('../config')

const msgDefaults = {
  response_type: 'in_channel',
  username: 'Nerdbot',
  icon_emoji: config('ICON_EMOJI')
}

const handler = (payload, res) => {
	if(payload.text.indexOf("hi") > -1)
	{
		let msg = _.defaults({
		channel: payload.channel_name,
		attachments: text: "Hello" }, msgDefaults)
		
		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		return
	}
	else{
		let msg = _.defaults({
		channel: payload.channel_name,
		attachments: { text: "Good bye"}
		}, msgDefaults)

		res.set('content-type', 'application/json')
		res.status(200).json(msg)
		return
	}
}

module.exports = { pattern: /response/ig, handler: handler }