module.exports = {
    token: "TOKEN", // Zorunlu
    prefix: "PREFIX", // Zorunlu
    server: {
        messages: {
            memberadd: `
            ( Levian Register )
            
            [uye], **[sunucuad]** adlı sunucuya hoşgeldin!

            [yetkili] yetkisindeki kişiler sizinle ilgilenecektir!

            Hesap [olusturulduguzaman] tarihinde oluşturuldu!
            ` // Varyasyonlar: [sunucuad], [uye], [yetkili], [olusturulduguzaman], [guvenli]
        },
        tag: "TAG",
        roles: { 
            auth: "KAYIT YETKİLİ ROL ID", // Zorunlu
            unreg: "KAYITSIZ ROL ID", // Zorunlu
            boy: {
                one: "1. ERKEK ROL ID", // Zorunlu
                two: "2. ERKEK ROL ID", // Varsa
                three: "3. ERKEK ROL ID" // Varsa
            },
            girl: {
                one: "1. KIZ ROL ID", // Zorunlu
                two: "2. KIZ ROL ID", // Varsa
                three: "3. KIZ ROL ID" // Varsa
            },
        },
        channels: {
            chat: `SOHBET KANAL ID`, // İsterseniz
            log: `KAYIT LOG KANAL ID`, // İsterseniz
            reg: `KAYIT KANAL ID` // Zorunlu
        },
        systems: {
            chatmsend: `KAYIT OLUNCA SOHBET'E MESAJ`, // evet hayır diye cevap verin!
            logmsend: `KAYIT OLUNCA LOG'A MESAJ` // evet hayır diye cevap verin!
        }   
    }
}