const { MessageEmbed } = require("discord.js");

module.exports = {
	name: "skip",
	aliases: ["s"],
	category: "Music",
	description: "Skip the currently playing song",
	args: false,
  usage: "",
  permission: [],
  owner: false,
  nsfw: false,
  player: true,
  inVoiceChannel: true,
  sameVoiceChannel: true,
  cooldown: 5000,
execute: async (message, args, client, prefix) => {
  try {
            const date = new Date();
            let user = message.author.username;
            console.log(`${user} used SKIP Command TIME: ${date.toLocaleString()}`);
        } catch (err) {
            console.log(err);
        }
  
		const player = message.client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
         return message.reply({embeds: [thing]});
        }
        const song = player.queue.current;

           player.stop();
           
		const emojiskip = message.client.emoji.skip;

		let thing = new MessageEmbed()
			.setDescription(`${emojiskip} **Skipped**\n[${song.title}](${song.uri})`)
			.setColor(message.client.embedColor)
			.setTimestamp()
		return message.reply({embeds: [thing]}).then(msg => { setTimeout(() => {msg.delete()}, 3000);
       })
	
    }
};