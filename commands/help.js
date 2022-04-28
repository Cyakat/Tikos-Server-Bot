const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('A helpful menu'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Help')
        .setDescription('A list of all available commands')
        .setColor(0x2c93bf)
        .addField('/vanilla','Returns the vanilla server ip address')
        .addField('/modded','Returns the modded server ip address', true)
        .addField('/whitelist','Allows you to add yourself to the vanilla server whitelist')
        .addField('/modpack','Returns a link to the modpack being used', true);
        interaction.reply({embeds: [embed]});
    }
}