let help = new Map([
    ['token', 'The token is what the bot uses to connect to discord. To generate a bot token go to https://discordapp.com/developers/applications/#top create a new app and add a bot.'],
    ['greeting', 'The message to display in chat when robit comes online'],
    ['broadcastMessage', 'The message to display in chat'],
    ['helpMessage', 'The message to display when help is requested (!robit help actionname)'],
    ['channelInfo', 'The name or id of the channel to send the message to.']
]);

export default (id) => {
    return help.get(id);
}