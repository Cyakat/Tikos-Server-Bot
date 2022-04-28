const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vanilla')
    .setDescription('Replies with the vanilla server ip'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Vanilla Server')
        .setDescription('The Vanilla server ip is \n**mc.tikomc.tk**\nIt will always be on the latest version')
        .addField('Whitelist','You will need to be on the whitelist\n you can add yourself to the whitelist by using /whitelist', true)
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}