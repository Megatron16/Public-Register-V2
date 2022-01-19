const { Client, MessageEmbed, Collection } = require('discord.js')
const { token, prefix, server } = (global.config = require('./config'))
const client = new Client({ intents: 32767 })
const moment = require('moment')
const chalk = require('chalk')
const db = require('croxydb')
const fs = require('fs')
require('moment-duration-format')

client.on('messageCreate', async message => {
    try{
        let client = message.client
        if (message.author.bot) return
        if (message.channel.type == "DM") return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(' ')[0].slice(prefix.length).toLocaleLowerCase()
        let params = message.content.split(' ').slice(1)
        let cmd
        if (client.commands.has(command)) {
            cmd = client.commands.get(command)
        } else if (client.aliases.has(command)) {
            cmd = client.commands.get(client.aliases.get(command))
        }
        if (cmd) {
            cmd.run(client, message, params)
        }
    }catch(e){
        message.reply({ embeds: [
            new MessageEmbed()
            .setDescription(`**Beklenmedik bir hatayla karşılaştık!**`)
        ] })
    }
})  

const log = message => {
    console.log(`${message}`)
}
let fc = 1
client.commands = new Collection()
client.aliases = new Collection()
fs.readdir('./commands/', (err, files) => {
    if(!files) return console.log(chalk.bold.red(`Komutlar klasörü yok!`))
    if (err) console.error(err)
    log(chalk.bold.blue(`${files.length} komut yüklenecek.`))
    files.forEach(f => {
        let props = require(`./commands/${f}`)
        if(!props.name || !props.run){
            console.error(chalk.bold.red(`${fc}. sıradaki komut geçersiz!`))
            process.exit(0)
        }
        log(chalk.bold.gray(`Yüklenen komut: ${props.name}.`))
        fc++
        if(!props.aliases) props.aliases = []
        client.commands.set(props.name, props)
        props.aliases.forEach(alias => {
            client.aliases.set(alias, props.name)
        })
    })
})

client.on('guildMemberAdd', async member => {
    if(member.user.bot) return
    try{
        member.roles.add(server.roles.unreg)
        member.setNickname(`${server.tag} İsim Yaş`)
    }catch(e){
        console.log(e)
    }
    const one = moment(member.user.createdAt).format("DD")
    const two = moment(member.user.createdAt).format("MM").replace("01", "Ocak").replace("02", "Şubat").replace("03", "Mart").replace("04", "Nisan").replace("05", "Mayıs").replace("06", "Haziran").replace("07", "Temmuz").replace("08", "Ağustos").replace("09", "Eylül").replace("10", "Ekim").replace("11", "Kasım").replace("12", "Aralık")
    const three = moment(member.user.createdAt).format("YYYY hh.mm")
    const four = (Date.now() - member.createdAt) / (1000 * 60 * 60 * 24) <= 3 ? `Güvenilir değil!` : `Güvenilir!`
    member.guild.channels.cache.get(server.channels.reg).send(server.messages.memberadd.replace("[sunucuad]", member.guild.name).replace("[uye]", member).replace("[yetkili]", `<@&${server.roles.auth}>`).replace("[olusturulduguzaman]", `${one} ${two} ${three}`).replace("[guvenli]", four))
})

client.login(token).then(() => console.log(chalk.bold.green("LN - Giriş başarılı"))).catch(e => {
    console.log(chalk.bold.red(e))
    console.log(chalk.bold.red("LN - Giriş başarılı"))
    process.exit(0)
})