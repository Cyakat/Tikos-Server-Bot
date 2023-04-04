const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('A helpful menu'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Help')
        .setDescription('A list of all available commands')
        .setColor(EMBED_COLOR)
        .addField('/ip','Returns all of the IPs for every server')
        .addField('/main','Returns the vanilla server ip address')
        .addField('/alt','Returns information on the alt VM', true)
        .addField('/alt2','Returns information on the alt2 VM', true)
        .addField('/status','Allows you to see if the server has crashed or not')
        .addField('/restart','Allows you to restart the server if it has crashed')
        .addField('/list','Lists the vms that I am running and who asked for them');
        interaction.reply({embeds: [embed]});
    }
}
