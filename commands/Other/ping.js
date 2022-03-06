module.exports = {
    name: "ping",
    description: "botのpingを計測します",
    usages: [],
    aliases: [],
    cooldown: 1,
    guild: false,
    async message(message) {
        const ping_msg = await message.channel.send("Pong!\npingを計測しています。");
        ping_msg.edit(`Pong!\nWebSocket: **${ping_msg.createdTimestamp - message.createdTimestamp}ms** | Latency: **${message.client.ws.ping}**ms`);
    }
};
