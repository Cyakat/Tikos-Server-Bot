const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const commissions = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");
const { modpacks } = require("../modpacks.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('alt')
    .setDescription('Replies with information about the vm'),
    async execute(interaction) {
        row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Modpack Link')
            .setStyle('LINK')
            .setURL(modpacks[0].url)
        );
        embed = new MessageEmbed()
        .setTitle(commissions.VMs[1].VMCommissionedBy + '\'s Server')
        .setDescription('The ip for this server is \n **mc.tikomc.tk:25564**')
        .addField('Current Modpack', 'Currently running ' + modpacks[0].title)
        .setColor(EMBED_COLOR)
        interaction.reply({embeds: [embed], components: [row]});
    }
}