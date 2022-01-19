const { MessageEmbed } = require('discord.js')
const db = require('croxydb')

module.exports = {
    name: "kayıt-bilgi",
    async run(client, message, args){
        if(!message.member.roles.cache.get(global.config.server.roles.auth)) return message.react("🚫")
        const m = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
        message.reply({ embeds: [
            new MessageEmbed()
            .setAuthor({ name: `Kayıt B. -` + m.user.tag, iconURL: m.user.displayAvatarURL({ dynamic: true }) })
            .setDescription(`
            **Kız: ${db.fetch(`user.${m.id}.reg.girl`) || 0}**
            **Erkek: ${db.fetch(`user.${m.id}.reg.boy`) || 0}**
            **Toplam: ${db.fetch(`user.${m.id}.reg.total`) || 0}**
            `)
        ] })
    }
}