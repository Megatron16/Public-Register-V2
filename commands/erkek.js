const { MessageEmbed, Message } = require('discord.js')
const db = require('croxydb')

module.exports = {
    name: "erkek",
    aliases: [ "e", "man" ],
    async run(client, message, args){
        if(message.channel.id !== global.config.server.channels.reg) return message.react("🚫")
        if(!message.member.roles.cache.get(global.config.server.roles.auth)) return message.react("🚫")
        const q = [
            "Kayıt olacak kişiyi etiketleyin",
            "Kayıt olacak kişinin adını gir",
            "Kayıt olacak kişinin yaşını gir"
        ]
        let q1 = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let q2 = args[1]
        let q3 = args[2]
        let qcount = -1
        if(q1) qcount++ 
        if(q2) qcount++ 
        if(q3) qcount++ 
        if(qcount === 2){
            message.reply({ embeds: [
                new MessageEmbed()
                .setDescription(`**${q1} başarıyla kayıt edildi!**`)
            ] })
            try{
                q1.setNickname(`${global.config.server.tag} ${q2} ${q3}`)
                q1.roles.remove(global.config.server.roles.unreg)
                q1.roles.add(global.config.server.roles.boy.one)
                if(message.guild.roles.cache.get(global.config.server.roles.boy.two)) q1.roles.add(global.config.server.roles.boy.two)
                if(message.guild.roles.cache.get(global.config.server.roles.boy.three)) q1.roles.add(global.config.server.roles.boy.three)
                if(global.config.server.systems.chatmsend === "evet") message.guild.channels.cache.get(global.config.server.channels.chat).send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**${q1} aramıza katıldı!**`)
                ] })
                if(global.config.server.systems.logmsend === "evet") message.guild.channels.cache.get(global.config.server.channels.log).send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**${q1}, ${message.member} tarafından kayıt edildi! ( Erkek )**`)
                ] })
                db.add(`user.${message.member.id}.reg.boy`, 1)
                db.add(`user.${message.member.id}.reg.total`, 1)
            }catch(e){
                message.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
                ] })
                console.log(e)
            }
            return
        }
        qcount++
        message.channel.send({ embeds: [
            new MessageEmbed()
            .setDescription(`**${q[qcount]}**`)
        ] })
        const filter = collected => message.member.id === collected.member.id
        const collector = message.channel.createMessageCollector({ filter: filter })
        collector.on('collect', async collected => {
            if(qcount === 0){
                if(!collected.mentions.members.first()) return collected.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**Geçerli bir üye etiketleyin!**`)
                ] })
            }
            if(qcount === 2){
                if(isNaN(collected.content)) return collected.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**Geçerli bir sayı girin!**`)
                ] })
            }
            if(qcount === 0){
                q1 = collected.mentions.members.first()
            }
            if(qcount === 1){
                q2 = collected.content
            }
            if(qcount === 2){
                q3 = collected.content
            }
            if(qcount === 2){ 
                collector.stop()
                return collected.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**${q1} başarıyla kayıt edildi!**`)
                ] })
            }
            qcount++
            collected.channel.send({ embeds: [
                new MessageEmbed()
                .setDescription(`**${q[qcount]}**`)
            ] })
        }).on('end', () => {
            try{
                q1.setNickname(`${global.config.server.tag} ${q2} ${q3}`)
                q1.roles.remove(global.config.server.roles.unreg)
                q1.roles.add(global.config.server.roles.boy.one)
                if(message.guild.roles.cache.get(global.config.server.roles.boy.two)) q1.roles.add(global.config.server.roles.boy.two)
                if(message.guild.roles.cache.get(global.config.server.roles.boy.three)) q1.roles.add(global.config.server.roles.boy.three)
                if(global.config.server.systems.chatmsend === "evet") message.guild.channels.cache.get(global.config.server.channels.chat).send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**${q1} aramıza katıldı!**`)
                ] })
                if(global.config.server.systems.logmsend === "evet") message.guild.channels.cache.get(global.config.server.channels.log).send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**${q1}, ${message.member} tarafından kayıt edildi! ( Erkek )**`)
                ] })
                db.add(`user.${message.member.id}.reg.boy`, 1)
                db.add(`user.${message.member.id}.reg.total`, 1)
            }catch(e){
                message.channel.send({ embeds: [
                    new MessageEmbed()
                    .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
                ] })
                console.log(e)
            }
        })
    }
}