const { Client, Intents, Collection, MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const config = require("./config/config.json");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_INTEGRATIONS] });
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs');


const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

const loggingChannel = "1026171856094515209";


client.on("channelCreate", async (channel) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Channel Created")
        .setDescription(`Channel Name: ${channel.name}\nChannel Type: ${channel.type}\nChannel ID: ${channel.id}`)
        .setFooter(channel.guild.name, channel.guild.iconURL({ dynamic: true }));

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setEmoji("🔍")
                .setLabel("Channel Link")
                .setURL(`https://discordapp.com/channels/${channel.guild.id}/${channel.id}`)
                .setStyle("LINK"),
        )

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        return channel2.send({ embeds: [embed], components: [row] });
    }
})

client.on("channelDelete", async (channel) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Channel Deleted")
        .setDescription(`Channel Name: ${channel.name}\nChannel Type: ${channel.type}\nChannel ID: ${channel.id}`)
        .setFooter(channel.guild.name, channel.guild.iconURL({ dynamic: true }));


    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})


client.on("channelUpdate", async (oldChannel, newChannel) => {

    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Channel Updated")
        .setDescription(`Channel Name: ${newChannel.name}\nChannel Type: ${newChannel.type}\nChannel ID: ${newChannel.id}`)

        .addField("Old Channel Name", oldChannel.name, true)
        .addField("Old Channel Type", oldChannel.type, true)
        .addField("Old Channel ID", oldChannel.id, true)

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setEmoji("🔍")
                .setLabel("Channel Link")
                .setURL(`https://discordapp.com/channels/${channel.guild.id}/${channel.id}`)
                .setStyle("LINK"),
        )


    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed], components: [row] });
    }
})


client.on("emojiCreate", async (emoji) => {
    let emojiUrl = "";

    if (emoji.animated) {
        emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.gif`;
    }
    else {
        emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.png`;
    }

    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Emoji Created")
        .setDescription(`Emoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}`)
        .setImage(emojiUrl)
        .setFooter(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
});


client.on("emojiDelete", async (emoji) => {
    let emojiUrl = "";

    if (emoji.animated) {
        emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.gif`;
    }
    else {
        emojiUrl = `https://cdn.discordapp.com/emojis/${emoji.id}.png`;
    }

    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Emoji Deleted")
        .setDescription(`Emoji Name: ${emoji.name}\nEmoji ID: ${emoji.id}`)
        .setImage(emojiUrl)
        .setFooter(emoji.guild.name, emoji.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
});


client.on("emojiUpdate", async (oldEmoji, newEmoji) => {

    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Emoji Updated")
        .setDescription(`Emoji Name: ${newEmoji.name}\nEmoji ID: ${newEmoji.id}`)

        .addField("Old Emoji Name", oldEmoji.name, true)
        .addField("Old Emoji ID", oldEmoji.id, true)

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})

client.on("inviteCreate", async (invite) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Invite Created")
        .setDescription(`Invite Code: ${invite.code}\nInvite URL: ${invite.url}`)
        .setFooter(invite.guild.name, invite.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})

client.on("inviteDelete", async (invite) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Invite Deleted")
        .setDescription(`Invite Code: ${invite.code}\nInvite URL: ${invite.url}`)
        .setFooter(invite.guild.name, invite.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})


client.on("messageDelete", async (message) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Message Deleted")
        .setDescription(`Message Author: ${message.author.tag}\nMessage Author ID: ${message.author.id}\nMessage Content: ${message.content}`)
        .setFooter(message.guild.name, message.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setEmoji("🔍")
                .setLabel("Channel Link")
                .setURL(`https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`)
                .setStyle("LINK"),
        )


    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed], components: [row] });
    }
})


client.on("guildUpdate", async (oldGuild, newGuild) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Guild Updated")
        .setDescription(`Guild Name: ${newGuild.name}\nGuild ID: ${newGuild.id}`)

        .addField("Old Guild Name", oldGuild.name, true)
        .addField("Old Guild ID", oldGuild.id, true)

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})


client.on("roleCreate", async (role) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Role Created")
        .setDescription(`Role Name: ${role.name}\nRole ID: ${role.id}`)
        .setFooter(role.guild.name, role.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})


client.on("roleUpdate", async (oldRole, newRole) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Role Updated")
        .setDescription(`Role Name: ${newRole.name}\nRole ID: ${newRole.id}`)

        .addField("Old Role Name", oldRole.name, true)
        .addField("Old Role ID", oldRole.id, true)

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
});


client.on("roleDelete", async (role) => {
    const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setTimestamp()
        .setAuthor(client.user.username, client.user.displayAvatarURL(), "https://akenodev.xyz")
        .setTitle("Role Deleted")
        .setDescription(`Role Name: ${role.name}\nRole ID: ${role.id}`)
        .setFooter(role.guild.name, role.guild.iconURL({ dynamic: true }));

    const channel2 = client.channels.cache.get(loggingChannel);

    if (!channel2) {
        throw new Error("\"loggingChannel\" does not exist in the cache.");
    }
    else {
        channel2.send({ embeds: [embed] });
    }
})

client.login(process.env.token);

