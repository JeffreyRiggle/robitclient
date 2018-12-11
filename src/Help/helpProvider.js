let help = new Map([
    ['token', 'The token is what the bot uses to connect to discord. To generate a bot token go to https://discordapp.com/developers/applications/#top then create a new app and add a bot.'],
    ['greeting', 'The message to display in chat when robit comes online.'],
    ['broadcastMessage', 'The message to display in chat.'],
    ['helpMessage', 'The message to display when help is requested (!robit help actionname).'],
    ['channelInfo', 'The name or id of the channel to send the message to.'],
    ['contentTitle', 'The title to display with the image.'],
    ['linkHelp', 'A link (URL) to the image to display in chat.'],
    ['apiMethod', 'The REST method to use (GET, PUT, POST, Etc)'],
    ['apiURL', 'The REST endpoint to connect to'],
    ['apiBody', 'The JSON body to send to the REST endpoint'],
    ['randomMessage', 'The list of messages to choose from. One will randomly be selected when the action is triggered.'],
    ['futureHelp', 'The specific date and time for the action to occur. This is a one time action.'],
    ['dailyHelp', 'The time of day, in your current time zone, that you would like the action to occur.']
]);

export default (id) => {
    return help.get(id);
}