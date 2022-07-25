const { Client, Message, MessageButton, MessageActionRow, MessageEmbed, Interaction, MessageSelectMenu } = require('discord.js');
const config = require('../config');

/**
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */

module.exports.exec = (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR")) return message.reply({ content: `Sem permissão.` })

    /*let _opts = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId('values-setupticket')
        .setPlaceholder(`Selecione o atendimento.`)
        .addOptions(
            { value: 0, name: "compra-servico", label: "Comprar um Serviço.", description: "Selecione para comprar um serviço de nossa Hospedagem.", emoji: "🛒" },
            { value: 1, name: "ajuda-atendimento", label: "Tire Dúvidas com gente.", description: "Selecione para você tirar algumas dúvidas sobre nois.", emoji: "🖐️" },
            { value: 2, name: "aplica-se", label: "Aplica-se.", description: "Selecione para fazer o forumalario para a nossa equipe.", emoji: "👮‍♂️" }
        )
    )*/

    let _opts = new MessageActionRow().addComponents(
        new MessageButton()
        .setCustomId("compra-servico")
        .setEmoji("🛒")
        .setLabel("Comprar um Serviço.")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("ajuda-atendimento")
        .setEmoji("🖐️")
        .setLabel("Tire Dúvidas com gente.")
        .setStyle("PRIMARY"),
        new MessageButton()
        .setCustomId("aplica-se")
        .setEmoji("👮‍♂️")
        .setLabel("Aplica-se para equipe.")
        .setStyle("PRIMARY")
    )

    message.channel.send({
        components:[_opts],
        embeds: [
            new MessageEmbed().setColor("#2F3136")
            .setThumbnail(message.guild.iconURL({dynamic:true}))
            .setTitle(`🪧 Menu de Seleção para o Atendimento.`)
            .setDescription(`<:IconRichPresence:999917565256155158> Para iniciar o atendimento selecione qual atendimento você queira, após a iniciação do atendimento a nossa equipe tem até 24h para responder você então sempre fique atendo pois a gente não irar menciona-lô ou algo assim.`)
            .addField(`<:time:1000062179359330335> Hora(s) & Dia(s)`, `Segunda á Sexta - 07:30 até 22:00\nSábado e Domingo - 07:30 até 19:00`, false)
            .addField(`<:3446blurplecertifiedmoderator:1000107570402443407> Atendente(s)`, `<@&999892117205815417>\n<@&999892118053081178>\n<@&999892118808039434>`, true)
            .addField(`<:5961blurpleemployee:1000061936303607901> Atendente(s) 24hr`, `<@&999892114848624820>\n<@&999892115733622784>\n<@&999892116438270062>`, true)
        ]
    })    

}

module.exports.config = {
    name: "setup-ticket",
    aliases: ["s-t"]
}