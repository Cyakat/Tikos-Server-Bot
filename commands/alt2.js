const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const status = require("../alt2Status.json");
const commissions = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alt2')
    .setDescription('Replies with the alt2 server ip'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle(commissions.VMs[2].VMCommissionedBy + '\'s Server ')
        .setDescription('The ip for this server is \n **mc.tikomc.tk:25563**')
        .addField('Current Status', status.status)
        //.addField('Modpack Link','You can get the link to the modpack using /modpack')
        .setColor(EMBED_COLOR)
        interaction.reply({embeds: [embed]});
    }
}