module.exports = {
  name: "help",
  description: "ボットコマンド一覧",
  usages: ["", "<コマンドの名前>"],
  aliases: ["command", "commands"],
  cooldown: 0,
  guild: false,
  message(message) {
    const embed = message.client.func.embed();
    if (!message.args[0]) {
      embed.setTitle("botのコマンド一覧");
      const categories = Array.from(new Set(message.client.commands.map(command => command.category))).sort();
      categories.forEach(category => {
        const data = message.client.commands.map(command => command.category == category ? `\`${message.prefix}${command.name}\` -- ${command.description}\n` : "");
        embed.addField(category, data.join(""));
      });
    } else {
      const command = message.client.commands.search(message.args[0]);
      if (!command) return message.channel.error(`**${message.args[0]}**のコマンドが存在しません。`);
      const pcmd = message.prefix + command.name + " ";
      embed.setTitle(`${command.name}の詳細`)
        .addField("説明", command.description)
        .addField("使用方法", command.usages.length > 1 ? command.usages.map(usage => pcmd + usage).join("\n") : pcmd);
      if (command.aliases.length > 1) embed.addField("短縮コマンド", command.aliases.map(alias => message.prefix + alias).join("\n"), true);
      embed.addField("クールダウン", `**${command.cooldown ? `${command.cooldown}秒` : "なし"}**`, true);
    };
    message.channel.send({ embeds: [embed] });
  }
};
