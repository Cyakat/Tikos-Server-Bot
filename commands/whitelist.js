const { SlashCommandBuilder } = require("@discordjs/builders");
const { exec } = require('child_process');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('whitelist')
    .setDescription('Adds you to the whitelist of the vanilla server')
    .addStringOption(option => option.setName('user-name').setDescription('This is your minecraft username').setRequired(true)),

    async execute(interaction) {
        exec('ssh 192.168.2.160 -i /home/cyakat/.ssh/minecraft_key "screen -S mine -X stuff \"whitelist add ' + interaction.options.getString('user-name') + '^M\""', (error, stdout, stderr) => {
            errorOccurred = false;
            if (error) {
                console.log(`failed to execute the command`);
                console.log(`error: ${error.message}`);
                errorOccurred = true;
            }
            if (stderr) {
                console.log(`Something went wrong while executing the command`);
                console.log(`stderr: ${stderr}`);
                errorOccurred = true;
            }
            console.log(`stdout: ${stdout}`);
            if (!errorOccurred) {
                interaction.reply(interaction.options.getString('user-name') + ' has been added to the whitelist!');
            }
            else {
                interaction.reply('Something went wrong while executing this command');
            }
        })

    }
}