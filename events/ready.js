const config = require("../config/config.json");

const authors = config.authors;

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.clear();
        console.log(`Logged in as ${client.user.tag}!`);


        const activitiesList = [
            `Red Cafe`,
            `${config.appRepo}`,
            `Logging Events`,
            `twitter: @akeno_dev`,
        ];

        for (const author in authors) {
            activitiesList.push(`${authors[author].name} || ${authors[author].role}`);
        }

        setInterval(() => {
            const index = Math.floor(Math.random() * (activitiesList.length - 1) + 1);
            const activity = activitiesList[index];
            client.user.setActivity(`${activity}`, {
                type: "STREAMING",
                url: "https://www.twitch.tv/akenodevlol",
            });
        }, 5000);

        console.log(activitiesList)


    },
};