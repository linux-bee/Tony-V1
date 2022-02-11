const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "skipto",
    aliases: ["jump"],
    category: "Music",
    description: "Forward song",
    args: true,
    usage: "<Number of song in queue>",
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
            console.log(`${user} used SKIPTO Command TIME: ${date.toLocaleString()}`);
        } catch (err) {
            console.log(err);
        }
  
		const player = client.manager.get(message.guild.id);

        if (!player.queue.current) {
            let thing = new MessageEmbed()
                .setColor("RED")
                .setDescription("There is no music playing.");
            return message.reply({embeds: [thing]});
        }

        const position = Number(args[0]);
		
		if (!position || position < 0 || position > player.queue.size) { 
			let thing = new MessageEmbed()
                .setColor("RED")
				.setDescription(`Usage: ${message.client.prefix}skipto <Number of song in queue>`)
            return message.reply({embeds: [thing]});
		}

        player.queue.remove(0, position - 1);
        player.stop();
		
		const emojijump = client.emoji.jump;

		let thing = new MessageEmbed()
			.setDescription(`${emojijump} Forward **${position}** Songs`)
			.setColor(client.embedColor)
			.setTimestamp()
			
		return message.reply({embeds: [thing]});
	
    }
};
