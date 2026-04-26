const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'ping',
    description: 'Check bot latency',
    async execute(socket, msg, number, userConfig, loadUserConfigFromMongo, activeSockets, socketCreationTime) {
        const fakeQuoted = {
            key: { participant: '0@s.whatsapp.net', remoteJid: '0@s.whatsapp.net', id: msg.key.id },
            message: { conversation: "✅" },
            contextInfo: { mentionedJid: [], forwardingScore: 999, isForwarded: true }
        };
        const sanitized = (number || '').replace(/[^0-9]/g, '');
        const cfg = await loadUserConfigFromMongo(sanitized) || {};
        const botName = cfg.botName || 'ADEEL-MINI';
        const latency = Date.now() - (msg.messageTimestamp * 1000 || Date.now());
        const text = `*⚡ ${botName} - Ping Check*\n\n` +
            `╭───(  \`𝗦𝘆𝘀𝘁𝗲𝗺 𝗦𝘁𝗮𝘁𝘀\`  )───\n` +
            `> 🏓 𝗟𝗮𝘁𝗲𝗻𝗰𝘆 : ${latency}ms\n` +
            `> 🕐 𝗦𝗲𝗿𝘃𝗲𝗿 𝗧𝗶𝗺𝗲 : ${new Date().toLocaleString()}\n` +
            `> 🟢 𝗦𝘁𝗮𝘁𝘂𝘀 : Online\n` +
            `╰──────────────────☉\n\n` +
            `> 𝗔𝗗𝗘𝗘𝗟-𝗠𝗜𝗡𝗜 💜`;
        await socket.sendMessage(msg.key.remoteJid, { text }, { quoted: fakeQuoted });
    }
};
