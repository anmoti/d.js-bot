const { MessageEmbed, Collection } = require("discord.js");

const config = {
  prefix: "dev!",
  embed: {
    colors: {
      Default: "#00FF7F",
      Youtube: "#FF0000"
    },
    footer: { text: "Created by !¿֍𝓪𝓷𝓶𝓸𝓽𝓲֍?¡#0163" },
  },
  blacklist: {
    user: []
  },
  auth: {
    discord: "TOKEN"
  }
};

const cache = {
  startDate: Date.now
};

const func = {
  reply: (data, message) => {
    let res;
    if (data !== null && typeof data === "object") {
      res = data;
      res.allowedMentions?.repliedUser ?? false;
    } else {
      res = {
        content: data,
        allowedMentions: { repliedUser: false }
      };
    };
    return message.reply(res);
  },
  embed: (color = config.embed.colors.Default) => {
    const embed = new MessageEmbed()
      .setFooter(config.embed.footer)
      .setColor(color)
      .setTimestamp();
    return embed;
  }
};

module.exports = {
  config: config,
  cache: cache,
  func: func
};
