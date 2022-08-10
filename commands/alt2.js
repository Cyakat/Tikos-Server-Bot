const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alt2')
    .setDescription('Replies with the alt2 server ip'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Alt Server 2')
        .setDescription('The Alt server ip is \n **mc.tikomc.tk:25563**')
        .addField('Current Status', 'Running Mineshafts and Monsters standard version')
        .addField('Modpack Link','You can get the link to the modpack using /modpack2')
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}