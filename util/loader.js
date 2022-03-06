const fs = require("fs");
const { Collection } = require("discord.js");

module.exports = {
    commands(client) {
        const dir = "./commands";
        client.commands = new Collection();
        client.commands.search = name => { return client.commands.get(name) || client.commands.find(command => command.aliases && command.aliases.includes(name)) };
        fs.readdirSync(dir)
            .forEach(folder => {
                const folderPath = `${dir}/${folder}/`;
                fs.readdirSync(folderPath)
                    .forEach(file => {
                        if (!file.endsWith(".js")) return;
                        const command = require("../" + folderPath + file);
                        command.category = folder;
                        if (command.cooldown) command.cooldowns = new Collection();
                        client.commands.set(command.name, command);
                        console.log(`[Command loaded]: ${folder} > ${command.name}`);
                    });
            });
    },
    events(client) {
        const dir = "./events";
        fs.readdirSync(dir)
            .forEach(file => {
                if (!file.endsWith(".js")) return;
                const eventName = file.split(".")[0];
                client.on(eventName, require(`../${dir}/${file}`));
                console.log(`[Event loaded]: ${eventName}`);
            });
    }
};
