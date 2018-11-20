let config = {
    greeting: "Robit online. Boop Boop",
    audioSources: [],
    access: {
        default: [],
        users: [],
        deniedMessage: "You do not have the rights to perform this action"
    },
    deferredactions: [],
    actions: []
};

const getToken = () => {
    return config.token;
}

const setToken = (token) => {
    config.token = token;
}

const getGreeting = () => {
    return config.greeting;
}

const setGreeting = (greeting) => {
    config.greeting = greeting;
}

const getAudioSources = () => {
    return config.audioSources;
}

const addAudioSource = (audio) => {
    config.audioSources.push(audio);
}

const removeAudioSource = (audio) => {
    let ind = config.audioSources.indexOf(audio);

    if (ind !== -1) {
        config.audioSources.splice(ind, 1);
    }
}

const getDefaultUserPermissions = () => {
    return config.access.default;
}

const addDefaultUserPermission = (permission) => {
    config.access.default.push(permission);
}

const removeDefaultUserPermission = (permission) => {
    let ind = config.access.default.indexOf(permission);

    if (ind !== -1) {
        config.access.default.splice(ind, 1);
    }
}

const getAccessForUsers = () => {
    return config.access.users;
}

const addAccessUser = (user) => {
    config.access.users.push(user);
}

const removeAccessUser = (user) => {
    let ind = config.access.users.indexOf(user);

    if (ind !== -1) {
        config.access.users.splice(ind, 1);
    }
}

const getAccessDeniedMessage = () => {
    return config.access.deniedMessage;
}

const setAccessDeniedMessage = (message) => {
    config.access.deniedMessage = message;
}

const getDeferredActions = () => {
    return config.deferredactions;
}

const addDeferredAction = (permission) => {
    config.deferredactions.push(permission);
}

const removeDeferredAction = (permission) => {
    let ind = config.deferredactions.indexOf(permission);

    if (ind !== -1) {
        config.deferredactions.splice(ind, 1);
    }
}

const getActions = () => {
    return config.actions;
}

const getActionById = (id) => {
    let retVal;

    config.actions.forEach(v => {
        if (!retVal && v.id === id) {
            retVal = v;
        }
    })

    return retVal;
}

const addAction = (permission) => {
    config.actions.push(permission);
}

const removeAction = (permission) => {
    let ind = config.actions.indexOf(permission);

    if (ind !== -1) {
        config.actions.splice(ind, 1);
    }
}

export {
    getToken,
    setToken,
    getGreeting,
    setGreeting,
    getAudioSources,
    addAudioSource,
    removeAudioSource,
    getDefaultUserPermissions,
    addDefaultUserPermission,
    removeDefaultUserPermission,
    getAccessForUsers,
    addAccessUser,
    removeAccessUser,
    getAccessDeniedMessage,
    setAccessDeniedMessage,
    getDeferredActions,
    addDeferredAction,
    removeDeferredAction,
    getActions,
    getActionById,
    addAction,
    removeAction
}