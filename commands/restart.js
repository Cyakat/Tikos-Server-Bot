const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('restart')
    .setDescription('Shows the status of each server'),
    
    async execute(interaction) {
        const collector = interaction.channel.createMessageComponentCollector({time: 15000});

        function restartServer (vm) {
            exec("ssh 192.168.2.160 -i .ssh/" + vm + "_key './mine'")
        }

        let mainStatus = ''
        let altStatus = ''
        let alt2Status = ''
        let vm = ''

        exec("ssh 192.168.2.160 -i .ssh/minecraft_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                mainStatus = 'running'
            }
        }); 
        exec("ssh 192.168.2.161 -i .ssh/modded_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                altStatus = 'running'
            }
        }); 
        exec("ssh 192.168.2.163 -i .ssh/alt2_key 'pidof java'", (error, stdout, stderr) => {
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
            .setLabel('Alt')
            .setStyle('PRIMARY')
            .setCustomId('alt'),
            new MessageButton()
            .setLabel('Alt2')
            .setStyle('PRIMARY')
            .setCustomId('alt2')
        )
        embed = new MessageEmbed()
        .setTitle('Restart')
        .setDescription('Click on one of the buttons to restart that server')
        .setColor(0x2c93bf)

        interaction.reply({embeds: [embed], components: [row]});

        collector.on('collect', async i => {
            await i.deferReply();
            if (i.customId === 'main') {
                if (mainStatus === 'running') {
                statusEmbed = new MessageEmbed()
                .setTitle('Main Server Restart')
                .setDescription('The Main Server is currently ' + mainStatus + '.')
                .setColor(0x2c93bf);
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting the Main server. Should be up soon.')
                    .setColor(0x2c93bf);
                    restartServer('main');
                }
            }
            if (i.customId === 'alt') {
                if (altStatus === 'running') {
               statusEmbed = new MessageEmbed()
                .setTitle('Alt Server Status')
                .setDescription('The Alt Server is currently ' + altStatus + '.')
                .setColor(0x2c93bf);
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting the Alt server. Should be up soon.')
                    .setColor(0x2c93bf);
                    restartServer('alt');
                }
            }
            if (i.customId === 'alt2') {
                if (alt2Status === 'running') {
                statusEmbed = new MessageEmbed()
                .setTitle('Alt2 Server Status')
                .setDescription('The Alt2 Server is currently ' + alt2Status + '.')
                .setColor(0x2c93bf)
                } else {
                    statusEmbed = new MessageEmbed()
                    .setTitle('Restarting the server')
                    .setDescription('Currently restarting the Alt2 server. Should be up soon.')
                    .setColor(0x2c93bf);
                    restartServer('alt2');
                }
            }
            await i.editReply({ embeds: [statusEmbed]})
        })
    }
}
