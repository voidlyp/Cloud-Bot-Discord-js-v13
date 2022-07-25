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
        .setCustomId("financero")
        .setEmoji("💳")
        .setLabel("Fazer orçamento.")
        .setStyle("PRIMARY")
    )

    message.channel.send({
        content: `
<:1129discord:1000119989262618674> - **Tabela de Preços do Serviço - Discord Bots :flag_us: **

<:IconRichPresence:999917565256155158> - **Planos básicos**.
  ➥ Discord Bot: **512MB** \`:\` *R$ 1,75*
  ➥ Discord Bot: **2GB** \`:\` *R$ 3,50*
  ➥ Discord Bot: **4GB** \`:\` *R$ 6,90*
        
<:IconRichPresence:999917565256155158> - **Planos profissionais**.
  ➥ Discord Bot: **6GB** \`:\` *R$ 10,25*
  ➥ Discord Bot: **12GB** \`:\` *R$ 20,90*`,
        components:[_opts]
    })    

}

module.exports.config = {
    name: "discordbots",
    aliases: ["dcbts"]
}