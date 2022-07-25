const { Client, Message, MessageButton, MessageActionRow } = require('discord.js');
const config = require('../config');

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */

module.exports.exec = (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `Sem permissão.` })

    let _btns = new MessageActionRow().addComponents(
        new MessageButton()
            .setEmoji("🔔")
            .setCustomId("notify_adverts")
            .setLabel("Ping.Anúncios")
            .setStyle("PRIMARY"),
        new MessageButton()
            .setEmoji("🔄")
            .setCustomId("notify_updates")
            .setLabel("Ping.Atualizações")
            .setStyle("PRIMARY"),
        new MessageButton()
            .setEmoji("🤝")
            .setCustomId("notify_parthers")
            .setLabel("Ping.Parcerias")
            .setStyle("PRIMARY")
    )
	let _btns_2 = new MessageActionRow().addComponents(
        new MessageButton()
            .setEmoji("1000506523853787277")
            .setCustomId("add_all")
            .setLabel("Adicione todos os Ping's")
            .setStyle("SUCCESS"),
        new MessageButton()
            .setEmoji("⚠️")
            .setCustomId("remove_all")
            .setLabel("Remova todos os Ping's")
            .setStyle("DANGER")
    )

    message.channel.send({
        content: `
:placard: - **Cargos de Notificações**.
  ➥ <@&999892125174992927> - Para receber todos os anúncios de nossa __Hospedagem__ 
  ➥ <@&999892124663300106> - Para receber qualquer tipo de atualizações de nossa __Hospedagem__ 
  ➥ <@&999892127167303690> - Para receber todos os ping's de vossos parceiros de nossa __Hospedagem__

**${config.footer}**`,
        components: [_btns,_btns_2]
    });

}

module.exports.config = {
    name: "cargos",
    aliases: ["roles"]
}