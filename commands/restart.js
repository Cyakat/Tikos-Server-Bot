const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { exec } = require("child_process");
const { VMs } = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Shows the status of each server'),
    
    async execute(interaction) {
        const collector = interaction.channel.createMessageComponentCollector({time: 15000});

        function restartServer (vm) {
            exec("ssh " + vm + " -i ~/.ssh/" + vm + "_key './mine'")
        }

        let mainStatus = ''
        let altStatus = ''
        let alt2Status = ''

        exec("ssh 192.168.2.160 -i ~/.ssh/main_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                mainStatus = 'running'
            }
        }); 
        exec("ssh 192.168.2.161 -i ~/.ssh/alt_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                altStatus = 'running'
            }
        }); 
        exec("ssh 192.168.2.163 -i ~/.ssh/alt2_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                alt2Status = 'running'
            }
        }); 

        
        row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel('Main')
            .setStyle('PRIMARY')
            .setCustomId('main'),
            new MessageButton()
            .setLabel(VMs[1].VMCommissionedBy + '\'s Server')
            .setStyle('PRIMARY')
            .setCustomId('alt'),
            new MessageButton()
            .setLabel(VMs[2].VMCommissionedBy + '\'s Server')
            .setStyle('PRIMARY')
            .setCustomId('alt2')
        )
        embed = new MessageEmbed()
        .setTitle('Restart')
        .setDescription('Click on one of the buttons to restart that server')
        .setColor(EMBED_COLOR)

        interaction.reply({embeds: [embed], components: [row]});

        collector.on('collect', async i => {
            await i.deferReply();
            if (i.customId === 'main') {
                if (mainStatus === 'running') {
                statusEmbed = new MessageEmbed()
                .setTitle('Main Server is Running!')
                .setDescription('The Main Server is already running!')
                .setColor(EMBED_COLOR);
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting the Main server. Should be up soon.')
                    .setColor(EMBED_COLOR);
                    restartServer('main');
                }
                collector.stop()
            }
            if (i.customId === 'alt') {
                if (altStatus === 'running') {
               statusEmbed = new MessageEmbed()
                .setTitle(VMs[1].VMCommissionedBy + '\'s Server is Running!')
                .setDescription(VMs[1].VMCommissionedBy + '\'s Server is already running!')
                .setColor(EMBED_COLOR);
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting ' + VMs[1].VMCommissionedBy + '\'s server. Should be up soon.')
                    .setColor(EMBED_COLOR);
                    restartServer('alt');
                }
                collector.stop()
            }
            if (i.customId === 'alt2') {
                if (alt2Status === 'running') {
                statusEmbed = new MessageEmbed()
                .setTitle(VMs[2].VMCommissionedBy + '\'s Server is Running!')
                .setDescription(VMs[2].VMCommissionedBy + '\'s Server is Running!')
                .setColor(EMBED_COLOR)
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting ' + VMs[2].VMCommissionedBy + '\'s server. Should be up soon.')
                    .setColor(EMBED_COLOR);
                    restartServer('alt2');
                }
                collector.stop()
            }
            await i.editReply({ embeds: [statusEmbed]})
        })
    }
}
