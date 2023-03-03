const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const status = require("../alt2Status.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alt2')
    .setDescription('Replies with the alt2 server ip'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Alt Server 2')
        .setDescription('The Alt server ip is \n **mc.tikomc.tk:25563**')
        .addField('Current Status', status.status)
        //.addField('Modpack Link','You can get the link to the modpack using /modpack')
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}