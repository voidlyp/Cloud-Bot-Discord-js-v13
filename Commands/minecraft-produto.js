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
<a:mine:1000144478989992017> - **Tabela de Preços do Serviço - Minecraft :flag_us:**.

<:IconRichPresence:999917565256155158> - **Planos normais**.
  ➥ Minecraft Server: **1GB** \`:\` *R$ 5,75*
  ➥ Minecraft Server: **2GB** \`:\` *R$ 11,50*
  ➥ Minecraft Server: **3GB** \`:\` *R$ 17,25*
  ➥ Minecraft Server: **4GB** \`:\` *R$ 22,90*
  ➥ Minecraft Server: **5GB** \`:\` *R$ 28,80*
  ➥ Minecraft Server: **6GB** \`:\` *R$ 34,60*
  ➥ Minecraft Server: **7GB** \`:\` *R$ 40,30*
  ➥ Minecraft Server: **8GB** \`:\` *R$ 45,90*
  ➥ Minecraft Server: **9GB** \`:\` *R$ 51,91*
  ➥ Minecraft Server: **10GB** \`:\` *R$ 57,98*
        
<:IconRichPresence:999917565256155158> - **Planos networks**.
  ➥ Minecraft Server: **12GB** \`:\` *R$ 69,98*
  ➥ Minecraft Server: **16GB** \`:\` *R$ 91,98*
  ➥ Minecraft Server: **32GB** \`:\` *R$ 183,98*
  ➥ Minecraft Server: **64GB** \`:\` *R$ 367,98*`,
        components:[_opts]
    }) 

//     message.channel.send({
//         content: `
// <a:mine:1000144478989992017> - **Tabela de Preços do Serviço - Minecraft :flag_us:**.

// <:IconRichPresence:999917565256155158> - **Planos normais**.
//   ➥ Minecraft Server: **1GB** \`:\` *R$ 12,00*
//   ➥ Minecraft Server: **2GB** \`:\` *R$ 23,95*
//   ➥ Minecraft Server: **3GB** \`:\` *R$ 35,95*
//   ➥ Minecraft Server: **4GB** \`:\` *R$ 47,95*
//   ➥ Minecraft Server: **5GB** \`:\` *R$ 59,95*
//   ➥ Minecraft Server: **6GB** \`:\` *R$ 71,95*
//   ➥ Minecraft Server: **7GB** \`:\` *R$ 83,95*
//   ➥ Minecraft Server: **8GB** \`:\` *R$ 95,98*
//   ➥ Minecraft Server: **9GB** \`:\` *R$ 107,98*
//   ➥ Minecraft Server: **10GB** \`:\` *R$ 119,98*
        
// <:IconRichPresence:999917565256155158> - **Planos networks**.
//   ➥ Minecraft Server: **12GB** \`:\` *R$ 143,98*
//   ➥ Minecraft Server: **16GB** \`:\` *R$ 191,98*
//   ➥ Minecraft Server: **32GB** \`:\` *R$ 383,98*
//   ➥ Minecraft Server: **64GB** \`:\` *R$ 767,98*`,
//         components:[_opts]
//     })    

}

module.exports.config = {
    name: "minecraft",
    aliases: ["mc"]
}