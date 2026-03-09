
        const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys")
        const pino = require("pino")
        const config = require("./config")

        async function startBot(){

        const { state, saveCreds } = await useMultiFileAuthState("data")

        const sock = makeWASocket({
        logger: pino({ level: "silent" }),
        auth: state
        })

        if(!sock.authState.creds.registered){

        const phone = config.ownerNumber
        const code = await sock.requestPairingCode(phone)

        console.log("PAIR CODE:", code)

        }

        sock.ev.on("creds.update", saveCreds)

        sock.ev.on("messages.upsert", async ({ messages }) => {

        const msg = messages[0]
        if(!msg.message) return

        const text = msg.message.conversation || ""

        if(text === ".menu"){

        await sock.sendMessage(msg.key.remoteJid,{
        text: `
╔══ REAL HACKERS BOT ══╗

🤖 .menu
👑 .owner
🛡 .antilink
🧹 .antidelete
⚡ .ping
💻 .hacktools

╚══════════════════════╝
`
        })

        }

        })

        }

        startBot()
