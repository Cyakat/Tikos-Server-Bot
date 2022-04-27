const { SlashCommandBuilder, Embed } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('vanilla')
    .setDescription('Replies with the vanilla server ip'),
    async execute(interaction) {
        embed = new Embed()
        .setTitle('Vanilla Server')
        .setDescription('The Vanilla server ip is \n**mc.tikomc.tk**')
        .addField('Whitelist','You will need to be on the whitelist\n you can add yourself to the whitelist by using /whitelist')
        .setColor(0x2c93bf)
        interaction.reply({embeds: [embed]});
    }
}