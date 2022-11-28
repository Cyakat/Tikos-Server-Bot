const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const status = require("./altStatus.json")

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alt')
    .setDescription('Replies with the alt server ip'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Alt Server 1')
        .setDescription('The Alt server ip is \n **mc.tikomc.tk:25564**')
        .addField('Current Status', status.status)
        //.addField('Modpack Link','You can get the link to the modpack using /modpack')
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}