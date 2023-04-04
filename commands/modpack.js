const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const modpack = require("../modpack.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modpack')
    .setDescription('Returns the modpack that the bot is currently running'),
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
        .setColor(EMBED_COLOR)
        .addField(modpack.title,modpack.description);
        interaction.reply({embeds: [embed], components: [row]});
    }
}
