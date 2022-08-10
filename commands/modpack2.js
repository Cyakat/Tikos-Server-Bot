const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const modpack = require("../modpack2.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modpack2')
    .setDescription('Returns the modpack that the alt2 server is currently running'),
    async execute(interaction) {
        row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Modpack Link')
            .setStyle('LINK')
            .setURL(modpack.url)
        )
        embed = new MessageEmbed()
        .setTitle('Current Modpack')
        .setDescription('The current modpack that is running on the modded server')
        .setColor(0x2c93bf)
        .addField(modpack.title,modpack.description);
        interaction.reply({embeds: [embed], components: [row]});
    }
}
