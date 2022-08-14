const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DiscordAPIError } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { exec } = require("child_process");
const { isObject, delay } = require("lodash");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('status')
    .setDescription('Shows the status of each server'),
    
    async execute(interaction) {
        let mainStatus = 'Down';
        let altStatus = 'Down';
        let alt2Status = 'Down';
        let ip = '';
        let dnsIP = '';
        let ipHasChanged = 'No';

        exec("ssh 192.168.2.160 -i ~/.ssh/main_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                mainStatus = 'Up'
            }
        }); 
        exec("ssh 192.168.2.161 -i ~/.ssh/alt_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                altStatus = 'Up'
            }
        }); 
        exec("ssh 192.168.2.163 -i ~/.ssh/alt2_key 'pidof java'", (error, stdout, stderr) => {
            if (stdout != '') {
                alt2Status = 'Up'
            }
        }); 
        exec("curl ifconfig.me", (error, stdout, stderr) => {
            ip = stdout;
        })
        exec("nslookup mc.tikomc.tk | grep Address: ", (error, stdout, stderr) => {
            dnsIP = stdout;
        })
        
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
        //interaction.deferReply();
        setTimeout(() => {
            dnsIP = dnsIP.split("\n")[1];
        dnsIP = dnsIP.replace("Address: ", "")

        if (dnsIP != ip) {
            ipHasChanged = 'Yes'
        }
        embed = new MessageEmbed()
        .setTitle('Status')
        .setDescription('Click on one of the buttons to see the status of that server')
        .addField('Has the IP changed: ', ipHasChanged)
        .addField('Main Server Status: ', 'The main server is currently ' +  mainStatus + '.')
        .addField('Alt Server Status: ', 'The Alt Server is currently ' + altStatus + '.')
        .addField('Alt2 Server Status: ', 'The Alt2 Server is currently ' + alt2Status + '.')
        .setColor(0x2c93bf)

        interaction.reply({embeds: [embed]});
        },200);
    }
}
