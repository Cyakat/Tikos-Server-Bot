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
        .addField('/main','Returns the vanilla server ip address')
        .addField('/alt','Returns the modded server ip address', true)
        .addField('/whitelist','Allows you to add yourself to the vanilla server whitelist (currently not needed)')
        .addField('/modpack','Returns a link to the modpack being used for the alt server', true)
        .addField('/status','Allows you to see if the server has crashed or not')
        .addField('/restart','Allows you to restart the server if it has crashed');
        interaction.reply({embeds: [embed]});
    }
}
