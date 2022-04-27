const { SlashCommandBuilder, Embed } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('modded')
    .setDescription('Replies with the modded server ip'),
    async execute(interaction) {
        embed = new Embed()
        .setTitle('Modded Server')
        .setDescription('The Modded server ip is \n **mc.tikomc.tk:25564**')
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}