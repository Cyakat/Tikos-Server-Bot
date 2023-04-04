const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('main')
    .setDescription('Replies with the main server ip'),
    async execute(interaction) {
        row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Chunkbase seed map')
            .setStyle('LINK')
            .setURL('https://www.chunkbase.com/apps/seed-map#-4789583113264944388')
        )
        embed = new MessageEmbed()
        .setTitle('Vanilla Server')
        .setDescription('The Main server ip is \n**mc.tikomc.tk**\nIt will be on 1.19.2')
        //.addField('Whitelist','You will need to be on the whitelist\n you can add yourself to the whitelist by using /whitelist (you username)', true)
        .addField('Seed','The seed is -4789583113264944388')
        .setColor(EMBED_COLOR)
        interaction.reply({embeds: [embed], components: [row]});
    }
}
