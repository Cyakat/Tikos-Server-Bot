const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { VMs } = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");
const { modpacks } = require("../modpacks.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('ip')
    .setDescription('Replies with all of the server IPs'),
    async execute(interaction) {
        const collector = interaction.channel.createMessageComponentCollector({time: 15000});

        mainRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(VMs[0].VMCommissionedBy + '\'s Server Info')
            .setCustomId(VMs[0].VMID)
            .setStyle('PRIMARY')
            .setDisabled()
        );
        altRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(VMs[1].VMCommissionedBy + '\'s Server Info')
            .setCustomId(VMs[1].VMID)
            .setStyle('PRIMARY')
            .setDisabled()
        );
        alt2Row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel(VMs[2].VMCommissionedBy + '\'s Server Info')
            .setCustomId(VMs[2].VMID)
            .setStyle('PRIMARY')
            .setDisabled()
        );

        row = new MessageActionRow();
        for (i = 0; i < VMs.length; i++) {
            row.addComponents(
                new MessageButton()
                .setLabel(VMs[i].VMCommissionedBy + '\'s Server Info')
                .setCustomId(VMs[i].VMID)
                .setStyle('PRIMARY')
            )
        }
        mainEmbed = new MessageEmbed()
        .setTitle('Server IPs')
        .setDescription('All servers, who owns them, and their IP')
        .setColor(EMBED_COLOR)
        .addField('----------------------------','----------------------------')
        for(i = 0; i < VMs.length; i++) {
            server = VMs[i];
            mainEmbed.addField(server.VMCommissionedBy + '\'s Server', 'Use command /' + server.VMName)
            .addField('Commissioned by', '`' + server.VMCommissionedBy + '`', true)
            .addField('IP: ', server.VMIP, true)
            .addField('----------------------------','----------------------------');
        }
        

        interaction.reply({embeds: [mainEmbed], components: [row]});

        collector.on('collect', async i => {
            
            if (i.customId === 'main') {
                row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Chunkbase seed map')
                    .setStyle('LINK')
                    .setURL('https://www.chunkbase.com/apps/seed-map#-4789583113264944388')
                )
                embed = new MessageEmbed()
                .setTitle('Vanilla Server')
                .setDescription('The Main server ip is \n**mc.tikomc.tk**\nIt will be on 1.19.2')
                //.addField('Whitelist','You will need to be on the whitelist\n you can add yourself to the whitelist by using /whitelist (you username)', true)
                .addField('Seed','The seed is -4789583113264944388')
                .setColor(EMBED_COLOR)
                i.reply({embeds: [embed], components: [row]});
                collector.stop()
                interaction.editReply({embeds: [mainEmbed], components: [mainRow]});
            } else if (i.customId === 'alt') {
                row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Modpack Link')
                    .setStyle('LINK')
                    .setURL(modpacks[0].url)
                );
                embed = new MessageEmbed()
                .setTitle(VMs[1].VMCommissionedBy + '\'s Server')
                .setDescription('The ip for this server is \n **mc.tikomc.tk:25564**')
                .addField('Current Modpack', 'Currently running ' + modpacks[0].title)
                .setColor(EMBED_COLOR)
                i.reply({embeds: [embed], components: [row]});
                collector.stop();
                interaction.editReply({embeds: [mainEmbed], components: [altRow]});
            } else if (i.customId === 'alt2') {
                row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setLabel('Modpack Link')
                    .setStyle('LINK')
                    .setURL(modpacks[1].url)
                );
                embed = new MessageEmbed()
                .setTitle(VMs[1].VMCommissionedBy + '\'s Server')
                .setDescription('The ip for this server is \n **mc.tikomc.tk:25563**')
                .addField('Current Modpack', 'Currently running ' + modpacks[1].title)
                .setColor(EMBED_COLOR)
                i.reply({embeds: [embed], components: [row]});
                collector.stop();
                interaction.editReply({embeds: [mainEmbed], components: [alt2Row]});
            }
        });
    }
}
