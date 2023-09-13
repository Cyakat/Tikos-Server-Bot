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

        var page = 0;
        const numPages = VMs.length;
        const collector = interaction.channel.createMessageComponentCollector({time: 10000});

        scrollRow = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setLabel("<")
            .setCustomId("left")
            .setStyle('PRIMARY')
            .setDisabled(),
            new MessageButton()
            .setLabel(">")
            .setCustomId("right")
            .setStyle("PRIMARY")
        );

        mainRow = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Chunkbase seed map')
            .setStyle('LINK')
            .setURL('https://www.chunkbase.com/apps/seed-map#-4789583113264944388')
        );
        altRow = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Modpack Link')
            .setStyle('LINK')
            .setURL(modpacks[0].url)
        );
        alt2Row = new MessageActionRow().addComponents(
            new MessageButton()
            .setLabel('Modpack Link')
            .setStyle('LINK')
            .setURL(modpacks[1].url)
        );
        rows = [mainRow, altRow, alt2Row];
        pageField = "Page: " + (page + 1) + "/" + numPages;

        embed = new MessageEmbed()
        .setTitle('Vanilla Server')
        .setDescription('The Main server ip is \n**mc.tikomc.tk**\nIt will be on ' + VMs[page].MCVersion)
        .setColor(EMBED_COLOR)
        .addFields(
            {name: "Seed", value: "The seed is -4789583113264944388"},
            {name: pageField, value: " "}
        );
        interaction.reply({embeds: [embed], components: [scrollRow, mainRow]});

        collector.on('collect', async i => {
            collector.resetTimer();

            if (i.customId === "left" && page > 0) {
                page--;
            } else if (i.customId === "right" && page < numPages) {
                page++;
            }
            if (page > 0) {

                if (page === numPages - 1) {
                    scrollRow.setComponents(
                    new MessageButton()
                        .setLabel("<")
                        .setCustomId("left")
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setLabel(">")
                        .setCustomId("right")
                        .setStyle("PRIMARY")
                        .setDisabled()
                    );
                } else {
                    scrollRow.setComponents(
                    new MessageButton()
                        .setLabel("<")
                        .setCustomId("left")
                        .setStyle('PRIMARY'),
                    new MessageButton()
                        .setLabel(">")
                        .setCustomId("right")
                        .setStyle("PRIMARY")
                    );
                }
                field1 = "Currently running " + modpacks[page-1].title;
                pageField = "Page: " + (page + 1) + "/" + numPages;
                embed = new MessageEmbed()
                .setTitle(VMs[page].VMCommissionedBy + '\'s Server')
                .setDescription('The ip for this server is \n **' + VMs[page].VMIP + '**')
                .setColor(EMBED_COLOR / 10 * (page * 3))
                .addFields(
                    {name: "Current Modpack", value: field1},
                    {name: pageField, value: " "}
                );
                i.update({embeds:[embed], components: [scrollRow, rows[page]]});
            } else {
                pageField = "Page: " + (page + 1) + "/" + numPages;

                scrollRow.setComponents(
                new MessageButton()
                    .setLabel("<")
                    .setCustomId("left")
                    .setStyle('PRIMARY')
                    .setDisabled(),
                new MessageButton()
                    .setLabel(">")
                    .setCustomId("right")
                    .setStyle("PRIMARY")
                );
                embed = new MessageEmbed()
                .setTitle('Vanilla Server')
                .setDescription('The Main server ip is \n**mc.tikomc.tk**\nIt will be on ' + VMs[page].MCVersion)
                .setColor(EMBED_COLOR)
                .addFields(
                    {name: "Seed", value: "The seed is -4789583113264944388"},
                    {name: pageField, value: " "}
                );
                i.update({embeds:[embed], components: [scrollRow, rows[page]]});
            }

        });
    }
}
