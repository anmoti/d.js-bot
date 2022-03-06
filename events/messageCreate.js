const time_fmt = require("../util/time-format");

module.exports = async (message) => {
  if (message.author.bot || message.channel.type === "dm") return;
  if (!message.channel.permissionsFor(message.guild.me).has("SEND_MESSAGES")) return;

  /*---------------FUNCTION---------------*/
  message.no_reply = data => { message.client.func.no_reply(data, message) };

  message.error = (data = null) => {
    if (message.command.cooldown) {
      clearInterval(message.command.cooldowns.interval);
      message.command.cooldowns.delete();
    };
    if (data !== null) message.no_reply(data);
  };

  /*---------------COMMAND---------------*/
  message.prefix = message.client.config.prefix;
  if (!message.content.startsWith(message.prefix)) return;
  message.args = message.content.slice(message.prefix.length).split(/ +/);
  message.command = message.client.commands.search(message.args.shift().toLowerCase());
  if (!message.command) return;
  if (message.command.guild && !message.inGuild()) return message.no_reply("このコマンドはサーバー内で実行して下さい。");

  /*---------------COOLDDOWN---------------*/
  if (message.command.cooldown) {
    if (message.command.cooldowns.has(message.author.id)) {
      const time_raw = Date.now() - message.command.cooldowns.get(message.author.id);
      const time = time_fmt(message.command.cooldown - Math.round(time_raw / 1000));
      return message.error(`\`${message.command.name}\`は後**${time}**実行できません。`)
    } else {
      message.command.cooldowns.set(message.author.id, Date.now());
      message.command.cooldowns.interval = setTimeout(() => {
        message.command.cooldowns.delete(message.author.id);
      }, message.command.cooldown * 1000);
    };
  };

  /*---------------BLACKLIST---------------*/
  const blacklist = message.client.config.blacklist;
  if (blacklist.user.includes(message.author.id)) return message.error("あなたはブラックリストに登録されています。");

  /*---------------RUNCOMMAND---------------*/
  console.log(message)
  try {
    message.command.message(message)
  } catch (error) {
    console.log("エラーが発生しました。");
    console.log(error);
    try {
      message.no_reply(`エラーが発生しました。発生したエラーは以下の通りです。\`\`\`${error}\`\`\`いかのサーバーで報告してください。\rhttps://discord.gg/sJ58GV4WxG`);
    } catch { return };
  };
};
