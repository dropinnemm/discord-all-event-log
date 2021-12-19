var modlogs = "kanal id";
let random = config.Colors[Math.floor(Math.random() * config.Colors.length)];
client.on("messageDelete", async (deletedMessage) => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  let scbul = deletedMessage.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()

    .setAuthor(
      `Bir Mesaj Silindi`,
      deletedMessage.guild.iconURL({ dynamic: true })
    )
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **Kullanıcı : ${deletedMessage.author}**
      > **Kullanıcı İd : ${deletedMessage.author.id}**
      
      **❯ Silinen Mesajın Bilgileri**
        > **• Mesaj :** \`${deletedMessage.content}\`      
        > **• Silindiği Kanal :** \`${deletedMessage.channel.name}\` 
    `
    )

    .setTimestamp()
    .setThumbnail(deletedMessage.author.avatarURL({ dynamic: true }))
    .setFooter(
      deletedMessage.author.tag,
      deletedMessage.author.avatarURL({ dynamic: true })
    );
  scbul.send(embed);
});

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  let modlogs = db.get(`modlog_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
    
    .setAuthor(
      `Bir Mesaj Güncellendi`,
      newMessage.guild.iconURL({ dynamic: true })
    )
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${newMessage.author}**
      > **• Kullanıcı İd : ${newMessage.author.id}**
      
      **❯ Düzenlenen Mesaj Bilgileri**
      
        > **• Yeni Mesaj :** \`${newMessage.content}\`      
        > **• Eski Mesaj :** \`${oldMessage.content}\`   
        > **• Düzenlendiği Kanal :** \`${newMessage.channel.name}\` 
        > **• Mesaja Gitmek İçin [Tıkla](${newMessage.url})**`
    )
    .setTimestamp()
    .setThumbnail(newMessage.author.avatarURL({ dynamic: true }))
    .setFooter(
      newMessage.author.tag,
      newMessage.author.avatarURL({ dynamic: true })
    );
  scbul.send(embed);
});

client.on("emojiCreate", async (emoji) => {
  let entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then((audit) => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);

  let modlogs = db.get(`modlog_${emoji.guild.id}`);
  let scbul = emoji.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()

    .setAuthor(`Bir Emoji Oluşturuldu`, emoji.guild.iconURL({ dynamic: true }))
    .setTitle(`Bir Mesaj Düzenlendi `)
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Oluşturulan Emojinin Bilgileri**
      
      > **• Emojinin İsmi :** \`${emoji.name}\`  
      > **• Emojinin İdsi :** \`${emoji.id}\`  
      > **• Emojinin Pozisyonu :** \`${emoji.position}\`  

    `
    )
    .setFooter(user.tag, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }))
    .setTimestamp();
  scbul.send(embed);
});

client.on("emojiDelete", async (emoji) => {
  let entry = await emoji.guild
    .fetchAuditLogs({ type: "EMOJI_CREATE" })
    .then((audit) => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  let modlogs = db.get(`modlog_${emoji.guild.id}`);
  let scbul = emoji.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
  

    .setAuthor(`Bir Emoji Silindi`, emoji.guild.iconURL({ dynamic: true }))
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Silinen Emojinin Bilgileri**
      
      > **• Emojinin İsmi :** \`${emoji.name}\`  
      > **• Emojinin İdsi :** \`${emoji.id}\`  
      > **• Emojinin Pozisyonu :** \`${emoji.position}\`  

    `
    )
    .setFooter(user.tag, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }));
  scbul.send(embed);
});

client.on("emojiUpdate", async (oldEmoji, newEmoji) => {
  let entry = await oldEmoji.guild
    .fetchAuditLogs({ type: "EMOJI_UPDATE" })
    .then((audit) => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  let modlogs = db.get(`modlog_${oldEmoji.guild.id}`);
  let scbul = oldEmoji.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
   
    .setAuthor(
      `Bir Emoji Düzenlendi`,
      oldEmoji.guild.iconURL({ dynamic: true })
    )
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Düzenlenen Emojinin Bilgileri**
      
      > **• Eski İsmi :** \`${oldEmoji.name}\`  
      > **• Yeni İsmi :** \`${newEmoji.name}\` 
      > **• Emojinin İdsi :** \`${newEmoji.id}\`  
  

    `
    )
    .setFooter(user.tag, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }));
  scbul.send(embed);
});

client.on("roleDelete", async (role) => {
  let entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then((audit) => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  let modlogs = db.get(`modlog_${role.guild.id}`);
  let scbul = role.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
    
    .setAuthor(`Bir Rol Silindi`, role.guild.iconURL({ dynamic: true }))
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Silinen Rolün Bilgileri**
      
      > **• Rolün İsmi :** \`${role.name}\`  
      > **• Rolün İdsi :** \`${role.id}\`
      > **• Rolün Rengi :** \`${role.hexColor}\` 
      > **• Rolün Pozisyonu :** \`${role.position}\`

    `
    )

    .setTimestamp()
    .setFooter(user.tag, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }));
  scbul.send(embed);
});

client.on("roleCreate", async (role) => {
  let entry = await role.guild
    .fetchAuditLogs({ type: "ROLE_CREATE" })
    .then((audit) => audit.entries.first());
  let user = client.users.cache.get(entry.executor.id);
  let modlogs = db.get(`modlog_${role.guild.id}`);
  let scbul = role.guild.channels.cache.get(modlogs);
  if (!scbul) {
  }
  let embed = new Discord.MessageEmbed()
   
    .setAuthor(`Bir Rol Oluşturuldu`, role.guild.iconURL({ dynamic: true }))
    .setDescription(
      `
      **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Oluşturulan Rolün Bilgileri**
      
      > **• Rolün İsmi :** \`${role.name}\`  
      > **• Rolün İdsi :** \`${role.id}\`
      > **• Rolün Rengi :** \`${role.hexColor}\` 
      > **• Rolün Pozisyonu :** \`${role.position}\`

    `
    )

    .setTimestamp()
    .setFooter(user.tag, user.avatarURL({ dynamic: true }))
    .setThumbnail(user.avatarURL({ dynamic: true }));
  scbul.send(embed);
});

client.on("channelUpdate", (oldChannel, newChannel) => {
  if (!oldChannel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  oldChannel.guild.fetchAuditLogs().then((logs) => {
    if (oldChannel.name !== newChannel.name) {
      let user = logs.entries.first().executor;
      let modlogs = db.get(`modlog_${newChannel.guild.id}`);
      let scbul = newChannel.guild.channels.cache.get(modlogs);
      if (!scbul) {
      }
      if (newChannel.type === "text") {
        let embed = new Discord.MessageEmbed()
        
          .setAuthor(
            `Bir Kanal Güncellendi`,
            newChannel.guild.iconURL({ dynamic: true })
          )
          .setDescription(
            ` **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Düzenlenen Kanalın Bilgileri**
      
      > **• Eski İsmi :** \`${oldChannel.name}\`  
      > **• Yeni İsmi :** \`${newChannel.name}\`  
      > **• Kanal :** ${newChannel}
      > **• İdsi :** \`${newChannel.id}\`
      > **• Pozisyonu :** \`${newChannel.position}\``
          )
          .setFooter(user.tag, user.avatarURL({ dynamic: true }))
          .setThumbnail(user.avatarURL({ dynamic: true }));
        scbul.send(embed);
      }
      if (newChannel.type === "voice") {
        let embed = new Discord.MessageEmbed()
        

          .setAuthor(
            `Bir Ses Düzenlendi Oluşturuldu`,
            newChannel.guild.iconURL({ dynamic: true })
          )
          .setDescription(
            ` **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Düzenlenen Kanalın Bilgileri**
      
      > **• Eski İsmi :** \`${oldChannel.name}\`  
      > **• Yeni İsmi :** \`${newChannel.name}\`  
      > **• Kanal :** ${newChannel}
      > **• İdsi :** \`${newChannel.id}\`
      > **• Pozisyonu :** \`${newChannel.position}\``
          )
          .setTimestamp()
          .setFooter(user.tag, user.avatarURL({ dynamic: true }))
          .setThumbnail(user.avatarURL({ dynamic: true }));
        scbul.send(embed);
      }
    }
  });
});

client.on("channelCreate", async (channel) => {
  if (!channel.guild.member(client.user).hasPermission("VIEW_AUDIT_LOG"))
    return;
  if (!channel.guild) return;
  channel.guild.fetchAuditLogs().then((logs) => {
    let user = logs.entries.first().executor;
    let modlogs = db.get(`modlog_${channel.guild.id}`);
    let scbul = channel.guild.channels.cache.get(modlogs);
    if (!scbul) {
    }
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
      

        .setAuthor(
          `Bir Yazı Kanal Oluşturuldu`,
          channel.guild.iconURL({ dynamic: true })
        )
        .setDescription(
          `
         **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Oluşturulan Kanalın Bilgileri**
      
      > **• Kanalın İsmi :** \`${channel.name}\`   
      > **• Kanal :** ${channel}
      > **• İdsi :** \`${channel.id}\`
      > **• Pozisyonu :** \`${channel.position}\``
        )
        .setTimestamp()
        .setFooter(user.tag, user.avatarURL({ dynamic: true }))
        .setThumbnail(user.avatarURL({ dynamic: true }));
      scbul.send(embed);
    }
    if (channel.type === "voice") {
      let embed = new Discord.MessageEmbed()
       
        .setAuthor(
          `Bir Ses Kanalı Oluşturuldu`,
          channel.guild.iconURL({ dynamic: true })
        )
        .setDescription(
          `
         **❯ Üye Bilgisi**
      
      > **• Kullanıcı : ${user}**
      > **• Kullanıcı İd : ${user.id}**
      
      **❯ Oluşturulan Kanalın Bilgileri**
      
      > **• Kanalın İsmi :** \`${channel.name}\`   
      > **• Kanal :** ${channel}
      > **• İdsi :** \`${channel.id}\`
      > **• Pozisyonu :** \`${channel.position}\``
        )
        .setTimestamp()
        .setFooter(user.tag, user.avatarURL({ dynamic: true }))
        .setThumbnail(user.avatarURL({ dynamic: true }));

      scbul.send(embed);
    }
  });
});

client.on("guildBanAdd", async (guild, user) => {
  let ban = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
    .then((audit) => audit.entries.first());
  if (!ban || !ban.executor) return;
  let modlogs = db.get(`modlog_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(
    (kanal) => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
  
      .setAuthor(`Bir Kullanıcı Yasaklandı`, guild.iconURL({ dynamic: true }))
      .setDescription(
        `      **❯ Yasaklayan Üye Bilgisi**
      
> **• Kullanıcı : ${ban.executor}**
> **• Kullanıcı İd : ${ban.executor.id}**
      
**❯ Yasaklanan Üye Bilgisi**
      
> **• Kullanıcı :** ${user}  
> **• İd : ${user.id}**
`
      )
      .setTimestamp()
      .setFooter(ban.executor.tag, ban.executor.avatarURL({ dynamic: true }))
      .setThumbnail(ban.executor.avatarURL({ dynamic: true }));
    modlogkanal.send(embed);
  }
});

client.on("guildBanRemove", async (guild, user) => {
  let ban = await guild
    .fetchAuditLogs({ type: "MEMBER_BAN_REMOVE" })
    .then((audit) => audit.entries.first());
  if (!ban || !ban.executor) return;
  let modlogs = db.get(`modlog_${guild.id}`);
  const modlogkanal = guild.channels.cache.find(
    (kanal) => kanal.id === modlogs
  );
  if (!modlogs) return;
  if (modlogs) {
    let embed = new Discord.MessageEmbed()
     
      .setAuthor(
        `Bir Kullanıcının Yasağı Kaldırıldı`,
        guild.iconURL({ dynamic: true })
      )
      .setDescription(
        `      **❯ Yasağı Kaldıran Üye Bilgisi**
      
> **• Kullanıcı : ${ban.executor}**
> **• Kullanıcı İd : ${ban.executor.id}**
      
**❯ Yasağı Kaldırılan Üye Bilgisi**
      
> **• Kullanıcı :** ${user}  
> **• İd : ${user.id}**
`
      )
      .setTimestamp()
      .setFooter(ban.executor.tag, ban.executor.avatarURL({ dynamic: true }))
      .setThumbnail(ban.executor.avatarURL({ dynamic: true }));
    modlogkanal.send(embed);
  }
});
