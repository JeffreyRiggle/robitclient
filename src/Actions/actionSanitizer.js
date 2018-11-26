const sanitizeBroadcast = (action) => {
    if (action.action && action.action.type === 'broadcast') {
        return;
    }

    action.action = {
        type: 'broadcast'
    }
}

const sanitizeEmbed = (action) => {
    if (action.action && action.action.type === 'embed') {
        return;
    }

    action.action = {
        type: 'embed',
        embed: {
            image: {
                url: ''
            }
        }
    }
}

const sanitizeHttp = (action) => {
    if (action.action && action.action.type === 'http') {
        return;
    }

    action.action = {
        type: 'http',
        body: {}
    }
}

const sanitizeMulti = (action) => {
    if (action.action && action.action.type === 'multiaction') {
        return;
    }

    action.action = {
        type: 'multiaction',
        actions: []
    }
}

const sanitizeRandomBroadcast = (action) => {
    if (action.action && action.action.type === 'broadcastrandom') {
        return;
    }

    action.action = {
        type: 'broadcastrandom',
        messages: []
    }
}

export {
    sanitizeBroadcast,
    sanitizeEmbed,
    sanitizeHttp,
    sanitizeMulti,
    sanitizeRandomBroadcast
}