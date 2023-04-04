const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { VMs } = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Replies with all of the server IPs'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('Server IPs')
        .setDescription('All servers, who owns them, and their IP')
        .setColor(EMBED_COLOR)
        .addField('----------------------------','----------------------------')
        for(var i = 0; i < VMs.length; i++) {
            server = VMs[i];
            embed.addField(server.VMCommissionedBy + '\'s Server', 'Use command /' + server.VMName)
            .addField('Commissioned by', '`' + server.VMCommissionedBy + '`', true)
            .addField('IP: ', server.VMIP, true)
            .addField('----------------------------','----------------------------');
        }
        

        interaction.reply({embeds: [embed]});
    }
}
