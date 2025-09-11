const mineflayer = require('mineflayer')

let bot = null

function createBot() {
    bot = mineflayer.createBot({
        host: 'sgs03.pineriver.net',
        username: 'Chimera_Book',
        auth: 'microsoft',
        port: 25761,
    })

    bot.once('spawn', () => {
        console.log('Bot spawned successfully')
        
        // Start looking at entities
        setInterval(() => {
            if (!bot.player) return // Check if bot is connected
            
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
        console.log('Bot died, respawning...')
        bot.respawn()
    })

    bot.on('end', () => {
        console.log('Bot disconnected, attempting to reconnect...')
        setTimeout(createBot, 60000) // Reconnect after 5 seconds
    })

    bot.on('kicked', (reason) => {
        console.log('Kicked:', reason)
    })

    bot.on('error', (err) => {
        console.log('Error:', err)
    })
}

// Initial bot creation
createBot()