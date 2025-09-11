const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: 'sgs03.pineriver.net', // minecraft server ip
  username: 'Chimera_Book', // username to join as if auth is `offline`, else a unique identifier for this account. Switch if you want to change accounts
  auth: 'microsoft', // for offline mode servers, you can set this to 'offline'
  port: 25761,              // set if you need a port that isn't 25565
})

function createBot () {
    bot.once('spawn', () => {
        setInterval(() => {
            const entity = bot.nearestEntity()
            if (entity !== null) {
            if (entity.type === 'player') {
                bot.lookAt(entity.position.offset(0, 1.6, 0))
            } else if (entity.type === 'mob') {
                bot.lookAt(entity.position)
            }
            }
        }, 50)
        bot.chat("meow")
    })

    bot.on('death', () => {
        bot.respawn()
    });

    // Log errors and kick reasons:
    bot.on('kicked', console.log)
    bot.on('error', console.log)
}

setInterval(() => {
    if (!bot.player) {
        createBot()
    }
}, 1000)