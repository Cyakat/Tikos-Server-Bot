const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { exec } = require("child_process");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the status of each server'),
    
    async execute(interaction) {
        const collector = interaction.channel.createMessageComponentCollector({time: 15000});

        let mainStatus = 'Down'
        let altStatus = 'Down'
        let alt2Status = 'Down'

        exec("ssh 192.168.2.160 -i .ssh/minecraft_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                mainStatus = 'Up'
            }
        }); 
        exec("ssh 192.168.2.161 -i .ssh/modded_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                altStatus = 'Up'
            }
        }); 
        exec("ssh 192.168.2.163 -i .ssh/alt2_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                alt2Status = 'Up'
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
        .setTitle('Status')
        .setDescription('Click on one of the buttons to see the status of that server')
        .setColor(0x2c93bf)

        interaction.reply({embeds: [embed], components: [row]});

        collector.on('collect', async i => {
            await i.deferReply();
            if (i.customId === 'main') {
                statusEmbed = new MessageEmbed()
                .setTitle('Main Server Status')
                .setDescription('The Main Server is currently ' + mainStatus + '.')
                .setColor(0x2c93bf)
            }
            if (i.customId === 'alt') {
               statusEmbed = new MessageEmbed()
                .setTitle('Alt Server Status')
                .setDescription('The Alt Server is currently ' + altStatus + '.')
                .setColor(0x2c93bf)
            }
            if (i.customId === 'alt2') {
                statusEmbed = new MessageEmbed()
                .setTitle('Alt2 Server Status')
                .setDescription('The Alt2 Server is currently ' + alt2Status + '.')
                .setColor(0x2c93bf)
            }
            await i.editReply({ embeds: [statusEmbed]})
        })
    }
}
