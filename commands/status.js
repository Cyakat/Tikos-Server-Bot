const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, DiscordAPIError, UserFlags } = require("discord.js");
const { MessageActionRow, MessageButton } = require("discord.js");
const { exec } = require("child_process");
const { VMs } = require("../vm_commissions.json");
const { EMBED_COLOR } = require("../EMBED_COLOR.json");

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
        //interaction.deferReply();
        

        exec("nslookup mc.tikomc.tk | grep Address: ", (error, stdout, stderr) => {
            setTimeout( () => {
                dnsIP = stdout;
            dnsIP = dnsIP.split("\n")[1];
            dnsIP = dnsIP.replace("Address: ", "")

            if (dnsIP != ip) {
                ipHasChanged = 'Yes'
            }
            embed = new MessageEmbed()
            .setTitle('Status')
            .setDescription('Click on one of the buttons to see the status of that server')
            .addField('Has the IP changed: ', ipHasChanged)
            .addField('If the IP has changed it means that you will not be able to log in to the server',':)')
            .addField('Main Server Status: ', 'The main server is currently ' +  mainStatus + '.')
            .addField('Alt Server Status: ', VMs[1].VMCommissionedBy + '\'s  Server is currently ' + altStatus + '.')
            .addField('Alt2 Server Status: ', VMs[2].VMCommissionedBy + '\'s  Server is currently ' + alt2Status + '.')
            .setColor(EMBED_COLOR)
    
            interaction.reply({embeds: [embed]});
            }, 1500)            
        })
    }
}