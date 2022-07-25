const { Client, Collection, MessageEmbed, MessageActionRow, MessageButton }  = require('discord.js');
const { readdir }                           = require('fs');
const { token, intents, footer, prefix, permissionOverwrites }    = require('./config');
const colors                                = require('./API/colors.json');
const client                                = new Client({ intents })
const moment                                = require('moment');
const mongoose                              = require('mongoose');

client.commands = new Collection();
client.aliases = new Collection();
moment.locale('pt-BR')

readdir('./Commands', async (err, files) => {
    if(err) return console.log(err.message, err.name)
    const jsfiles = await files.filter(f => f.split(".").pop() == "js");
    if(jsfiles <= 0) return console.log('[X]: Não encontrei nenhum arquivo na pasta comandos.')
    jsfiles.forEach((f, i) => {
        let pull = require(`./Commands/${f}`);
        client.commands.set(pull.config.name, pull)
        pull.config.aliases.forEach(alias => {
            client.aliases.set(alias, pull.config.name)
        })
    })
});

client.on("ready", async() => {
    console.log(`[V]: Bot online com sucesso "${client.user.tag}".`);

    client.user.setActivity({name: `www.seusiteaqui.com`, type: "PLAYING"})
});

client.on("messageCreate", async (message) => {

    if(message.author.bot) return;
    if(!message.content.startsWith(prefix)) return;
    if(message.channel.type == "DM") return;

    let args    = await message.content.slice(prefix.length).trim().split(/ +/g);
    let command = await args.shift().toLowerCase();

    const commandRun = await client.commands.get(command) || client.commands.get(client.aliases.get(command));
    if (commandRun) {
        commandRun.exec(client, message, args)
    }

});

client.on("guildMemberAdd", (member) => {
	try {
		member.roles.add(require("./config.js").cargos.membro)
	} catch (e) {
		console.log(e);
	}
})

client.on("interactionCreate", async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith('notify_adverts')) {
            interaction.reply({ content: `Cargo adicionado com sucesso.`, ephemeral: true });
            interaction.member.roles.add(require("./config.js").cargos.notificacao.anuncios)
        }
        if (interaction.customId.startsWith('notify_updates')) {
            interaction.reply({ content: `Cargo adicionado com sucesso.`, ephemeral: true });
            interaction.member.roles.add(require("./config.js").cargos.notificacao.atualizacoes)
        }
        if (interaction.customId.startsWith('notify_parthers')) {
            interaction.reply({ content: `Cargo adicionado com sucesso.`, ephemeral: true });
            interaction.member.roles.add(require("./config.js").cargos.notificacao.parcerias)
        }
        if (interaction.customId.startsWith('add_all')) {
            interaction.reply({ content: `Todos os ping's foram adicionados em seu perfil.`, ephemeral: true });
            interaction.member.roles.add(require("./config.js").cargos.notificacao.anuncios)
            interaction.member.roles.add(require("./config.js").cargos.notificacao.atualizacoes)
            interaction.member.roles.add(require("./config.js").cargos.notificacao.parcerias)
        }
        if (interaction.customId.startsWith('remove_all')) {
            interaction.reply({ content: `Todos os ping's foram removidos do seu perfil.`, ephemeral: true });
            interaction.member.roles.add(require("./config.js").cargos.notificacao.anuncios)
            interaction.member.roles.add(require("./config.js").cargos.notificacao.atualizacoes)
            interaction.member.roles.add(require("./config.js").cargos.notificacao.parcerias)
        }
        // Ticket
        if (interaction.customId.startsWith("compra-servico")) {
            const category = interaction.guild.channels.cache.find(c => c.topic === `Compra de Serviço => {${interaction.member.user.id}}`)
            if (category) return interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true });
            const canal = await interaction.guild.channels.create(`🛒-${interaction.member.user.username}`, {
                parent: "999892133584568350", // Coloque o ID da Categoria de Tickets
                reason: `${interaction.user.tag} abriu um ticket!`,
                type: "GUILD_TEXT",
                topic: `Compra de Serviço => {${interaction.member.user.id}}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    },
                    {
                        id: require("./config.js").cargos.staffs.moderador,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    }
                ]
            }).then((msg) => {
                interaction.reply({ content: "Ticket criado com sucesso.", ephemeral: true, })
                const _opts = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('button_close')
                    .setStyle('SECONDARY')
                    .setEmoji("🔐")
                    .setLabel("Fechar").setDisabled(false),
                    new MessageButton()
                    .setCustomId("button_transcript")
                    .setEmoji("🗒️").setLabel("Transcript")
                    .setStyle("SECONDARY").setDisabled(false)
                )
                msg.send({
                    content: `**Ticket aberto!** - <@&${require("./config.js").cargos.staffs.moderador}>`,
                    components: [_opts],
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`
    ☰ <@${interaction.user.id}> Bem vindo ao seu ticket de suporte!
    
    > *Por meio desse chat será feito o suporte por parte da equipe para lhe ajudar quanto a criação deste ticket. Fique atento aos horários de atendimento.*`)
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true, }), })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, }) || interaction.user.displayAvatarURL({ dynamic: true, }))
                        .setColor('#2f3136')
                    ],
                });   
            }).catch((err) => {
                console.log(err)
                interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, })
            })
        }
        if (interaction.customId.startsWith("ajuda-atendimento")) {
            const category = interaction.guild.channels.cache.find(c => c.topic === `Atendimento de Suporte => {${interaction.member.user.id}}`)
            if (category) return interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true });
            const canal = await interaction.guild.channels.create(`🖐️-${interaction.member.user.username}`, {
                parent: "999892133584568350", // Coloque o ID da Categoria de Tickets
                reason: `${interaction.user.tag} abriu um ticket!`,
                type: "GUILD_TEXT",
                topic: `Atendimento de Suporte => {${interaction.member.user.id}}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    },
                    {
                        id: require("./config.js").cargos.staffs.suporte,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    }
                ]
            }).then((msg) => {
                interaction.reply({ content: "Ticket criado com sucesso.", ephemeral: true, })
                const _opts = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('button_close')
                    .setStyle('SECONDARY')
                    .setEmoji("🔐")
                    .setLabel("Fechar").setDisabled(false),
                    new MessageButton()
                    .setCustomId("button_transcript")
                    .setEmoji("🗒️").setLabel("Transcript")
                    .setStyle("SECONDARY").setDisabled(false)
                )
                msg.send({
                    content: `**Ticket aberto!** - <@&${require("./config.js").cargos.staffs.suporte}>`,
                    components: [_opts],
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`
    ☰ <@${interaction.user.id}> Bem vindo ao seu ticket de suporte!
    
    > *Por meio desse chat será feito o suporte por parte da equipe para lhe ajudar quanto a criação deste ticket. Fique atento aos horários de atendimento.*`)
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true, }), })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, }) || interaction.user.displayAvatarURL({ dynamic: true, }))
                        .setColor('#2f3136')
                    ],
                });   
            }).catch((err) => {
                console.log(err)
                interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, })
            })
        }
        if (interaction.customId.startsWith("aplica-se")) {
            const category = interaction.guild.channels.cache.find(c => c.topic === `Aplicação para a Equipe da R3ady.Cloud => {${interaction.member.user.id}}`)
            if (category) return interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true });
            const canal = await interaction.guild.channels.create(`👮‍♂️-${interaction.member.user.username}`, {
                parent: "999892133584568350", // Coloque o ID da Categoria de Tickets
                reason: `${interaction.user.tag} abriu um ticket!`,
                type: "GUILD_TEXT",
                topic: `Aplicação para a Equipe da R3ady.Cloud => {${interaction.member.user.id}}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    },
                    {
                        id: require("./config.js").cargos.staffs.admin,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    }
                ]
            }).then((msg) => {
                interaction.reply({ content: "Ticket criado com sucesso.", ephemeral: true, })
                const _opts = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('button_close')
                    .setStyle('SECONDARY')
                    .setEmoji("🔐")
                    .setLabel("Fechar").setDisabled(false),
                    new MessageButton()
                    .setCustomId("button_transcript")
                    .setEmoji("🗒️").setLabel("Transcript")
                    .setStyle("SECONDARY").setDisabled(false)
                )
                msg.send({
                    content: `**Ticket aberto!** - <@&${require("./config.js").cargos.staffs.admin}>`,
                    components: [_opts],
                    embeds: [
                        new MessageEmbed()
                        .setDescription(`
    ☰ <@${interaction.user.id}> Bem vindo ao seu ticket de suporte!
    
    > *Por meio desse chat será feito o suporte por parte da equipe para lhe ajudar quanto a criação deste ticket. Fique atento aos horários de atendimento.*`)
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true, }), })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, }) || interaction.user.displayAvatarURL({ dynamic: true, }))
                        .setColor('#2f3136')
                    ],
                });   
            }).catch((err) => {
                console.log(err)
                interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, })
            })
        }
        if (interaction.customId.startsWith("button_close")) {
            //if (interaction.member.permissions.has("MANAGE_CHANNELS")) return interaction.reply({content:`Sem acesso.`, ephemeral: true})
            interaction.reply({content:`\\🔒 Olá ${interaction.user}, este ticket será fechado em \`5 segundos\`...`}).then(() => {
                setTimeout(() => {
                    interaction.channel.delete();
                }, 5000)
            })
        }
        // Orçamento
        if (interaction.customId.startsWith("financero")) {
            const category = interaction.guild.channels.cache.find(c => c.topic === `Fazendo Orçamento na R3ady.Cloud => {${interaction.member.user.id}}`)
            if (category) return interaction.reply({ content: "Você já tem um ticket aberto!", ephemeral: true });
            const canal = await interaction.guild.channels.create(`💳-${interaction.member.user.username}`, {
                parent: "999892131344830634", // Coloque o ID da Categoria de Tickets
                reason: `${interaction.user.tag} abriu um ticket!`,
                type: "GUILD_TEXT",
                topic: `Fazendo Orçamento na R3ady.Cloud => {${interaction.member.user.id}}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    },
                    {
                        id: "999892117205815417",
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    }
                ]
            }).then((msg) => {
                interaction.reply({ content: "Orçamento criado com sucesso.", ephemeral: true, })
                const _opts = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setCustomId('button_done')
                    .setStyle('SUCCESS')
                    .setEmoji("☑️")
                    .setLabel("Concluir Pagamento.").setDisabled(false)
                )
                msg.send({
                    content: "**Orçamento aberto!** -" + require("./config.js").cargos.staffs.fundador,
                    components: [_opts],
                    embeds: [
                        new MessageEmbed().setDescription(`> Após a terminar o pagamento favor mandar o comprovante e clicar no botão abaixo.`)
                        .addField(`<:IconCreditCard:1000145072899231874> Métodos de Pagamento.`, `  ➥ Mercado Pago (\`007bef09-25a8-4de4-9e3b-f684d078c0ad\`)\n  ➥ PayPal (\`C. Credito\`)\n  ➥ PicPay (\`phelypecocco076@gmail.com\`)`, true)
                        .setImage("https://cdn.discordapp.com/attachments/951904743154937976/1000147759615193290/Receba_com_PicPay_1.jpg")
                        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true, }), })
                        .setThumbnail(interaction.guild.iconURL({ dynamic: true, }) || interaction.user.displayAvatarURL({ dynamic: true, }))
                        .setColor('#2f3136')
                    ],
                });   
            }).catch((err) => {
                console.log(err)
                interaction.reply({ content: "Não foi possível criar seu ticket, sinto muito.", ephemeral: true, })
            })
        }
        if (interaction.customId.startsWith("button_done")) {
            interaction.guild.channels.edit(interaction.channel.id, {
                name: `💳-${interaction.member.user.username}-☑️`,
                topic: `☑️ Pagamento concluido. {${interaction.member.user.id}}`,
                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: ["VIEW_CHANNEL"]
                    },
                    {
                        id: interaction.user.id,
                        allow: ["VIEW_CHANNEL","ATTACH_FILES"],
                        deny: ["SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    },
                    {
                        id: "999892117205815417",
                        allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "ATTACH_FILES", "ADD_REACTIONS"]
                    }
                ]
            }).then(msg => {
                interaction.reply({
                    content: `Pagamento concluido com sucesso, agora só aguardar a sua Hospedagem em torno de 24h você irar recebe-ló neste canal então fique atendo.`
                })
            })
        }
        // Transcript
        if (interaction.customId.startsWith("button_transcript")) {
            if (!interaction.member.permissions.has("MANAGE_CHANNELS"));

            const channel = await interaction.channel
            const moment = require('moment'); moment.locale('pt-BR')
            let messages = []

            await channel.messages
                .fetch({ limit: 100 })
                .then(messagePage => {
                    messagePage.forEach(m => {

                        messages.push(`[0;30m${moment(m.createdTimestamp).format('(hh:mm:ss) DD/MM/YYYY')} - ${m.author.username}#${m.author.discriminator}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`)
                            
                    });
                    message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                    messages.reverse().join("\n")
                })

            const hastebin = require("hastebin-gen");

            hastebin(messages.join("\n"), { extension: "txt" }).then(haste => {
                const haste_button = new MessageActionRow().addComponents(
                    new MessageButton()
                    .setStyle("LINK")
                    .setLabel(`Ver codigo.`)
                    .setURL(haste)
                )
                //interaction.channel.send(haste);
                client.channels.cache.get("999892161430564975").send({ components: [haste_button], content: `<#${channel.id}> - *${channel.name}*
\`\`\`ansi
[0;37m
====================== Registro de Auditoria. Ticket's ======================

${messages.join("\n")}

\`\`\`` })
                interaction.reply({ content: `Transcript enviado para o canal Logs.` })
            })
        }
    }
})

client.login(token)