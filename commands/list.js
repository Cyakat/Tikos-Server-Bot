const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { VMs } = require("../vm_commissions.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('list')
    .setDescription('Lists the running vms and who asked for them'),
    async execute(interaction) {
        embed = new MessageEmbed()
        .setTitle('List of vms')
        .setDescription('A list of the available vms')
        .addField('Server Specs','Each Server will be given 1-3 cores based on the need of the server. Each Server will also be alloted 16GB of RAM')
        .setColor(0x2c93bf)
        .addField('----------------------------','----------------------------')
        .setFooter({ text: 'You can always message @Cyakat#5061 for questions of if you wish to claim a vm'});
        for(var i = 0; i < VMs.length; i++) {
            server = VMs[i];
            embed.addField(server.VMName, server.VMDescription)
            .addField('Commissioned by', '`' + server.VMCommissionedBy + '`', true)
            .addField('Availability', server.VMAvailability, true)
            .addField('----------------------------','----------------------------');
        }
        

        interaction.reply({embeds: [embed]});
    }
}
