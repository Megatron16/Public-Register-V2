const { MessageEmbed, MessageActionRow, MessageSelectMenu, Collection } = require('discord.js')
const db = require('croxydb')

module.exports = {
    name: "top",
    async run(client, message, args){
        // if(!message.member.roles.cache.get(global.config.server.roles.auth)) return message.react("🚫")
        const m = await message.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Alttan hangi türe bakcağınızı seçin!**`)
        ], components: [
            new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("top-secim")
                .setMinValues(1)
                .setMaxValues(1)
                .setPlaceholder("Tür seçim!")
                .addOptions([
                    {
                        value: `girl`,
                        label: `Kız`
                    },
                    {
                        value: `boy`,
                        label: `Erkek`
                    },
                    {
                        value: `total`,
                        label: `Toplam`
                    }
                ])
            )
        ] })
        const f = async i => message.member.id === i.member.id
        const collector = m.createMessageComponentCollector({ filter: f })
        collector.on('collect', async i => {
            if(i.values[0] === "girl"){
                i.deferUpdate()
                i.message.delete()
                const collection = new Collection()
                await Promise.all(
                    message.guild.members.cache.filter(r => db.fetch(`user.${r.id}.reg.girl`)).map(u => {
                        collection.set(u.id, {
                            id: u.id,
                            value: db.fetch(`user.${u.id}.reg.girl`)
                        })
                    })
                )

                const data = collection.sort((a,b) => b.value - a.value).first(10)
                i.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`
                    **TOP ( Kız kayıt )**

                    ${data.map((v,i) => `**${i+1}.** <@${v.id}> > **${v.value}**`).join("\n") || "Veri yok!"}
                    `)
                ] })
            }
            if(i.values[0] === "boy"){
                i.deferUpdate()
                i.message.delete()
                const collection = new Collection()
                await Promise.all(
                    message.guild.members.cache.filter(r => db.fetch(`user.${r.id}.reg.boy`)).map(u => {
                        collection.set(u.id, {
                            id: u.id,
                            value: db.fetch(`user.${u.id}.reg.boy`)
                        })
                    })
                )

                const data = collection.sort((a,b) => b.value - a.value).first(10)
                i.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`
                    **TOP ( Erkek kayıt )**

                    ${data.map((v,i) => `**${i+1}.** <@${v.id}> > **${v.value}**`).join("\n") || "Veri yok!"}
                    `)
                ] })
            }
            if(i.values[0] === "total"){
                i.deferUpdate()
                i.message.delete()
                const collection = new Collection()
                await Promise.all(
                    message.guild.members.cache.filter(r => db.fetch(`user.${r.id}.reg.total`)).map(u => {
                        collection.set(u.id, {
                            id: u.id,
                            value: db.fetch(`user.${u.id}.reg.total`)
                        })
                    })
                )

                const data = collection.sort((a,b) => b.value - a.value).first(10)
                i.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`
                    **TOP ( Toplam kayıt )**

                    ${data.map((v,i) => `**${i+1}.** <@${v.id}> > **${v.value}**`).join("\n") || "Veri yok!"}
                    `)
                ] })
            }
        })
    }
}