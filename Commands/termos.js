const { Client, Message, MessageButton, MessageActionRow, MessageEmbed, Interaction } = require('discord.js');
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
            .setEmoji("📨")
            .setURL(`https://termos.r3adycloud.xyz`)
            .setLabel(`Termos de Política`)
            .setStyle("LINK")
    )

    message.channel.send({
        components: [_btns],
        content: `
<:IconRulesChannel:1000105340991447060> - **Algumas Diretrizes da __R3ady.Cloud__**
⤹ Ler com muita atenção pois se você quebrar uma regrinha não irar de volta mais.

<:MarkNumber_1:1000105582130376755> **›** Qualquer tipos de __ofensas__. (\`Artigo.#1\`)
   ﹂ [ **1.BANIMENTO** ]

<:MarkNumber_2:1000105583879393281> **›** Divulgação sem a permissão dos superiores. (\`Artigo.#2\`)
   ﹂ [ **1.BANIMENTO** ]

<:MarkNumber_3:1000105585968169080> **›** Flood/Spam. (\`Artigo.#3\`)
   ﹂ [ **1.AVISO** ]
   ﹂ [ **2.EXPULSÃO** ]
   ﹂ [ **3.BANIMENTO** ]

<:MarkNumber_4:1000105587603935232> **›** Conteúdo para maiores de 18 anos. (\`Artigo.#4\`)
   ﹂ [ **1.EXPULSÃO** ]
   ﹂ [ **2.BANIMENTO** ]

<:MarkNumber_5:1000105589193592994> **›** Mencionar membros/cargos da equipe. (\`Artigo.#5\`)
   ﹂ [ **1.EXPULSÃO** ]
   ﹂ [ **2.BANIMENTO** ]

<:IconRichPresence:999917565256155158> - **R3ady.Cloud \©️ Todos os direitos reservados**.`
    })    

}

module.exports.config = {
    name: "termos",
    aliases: ["terms"]
}