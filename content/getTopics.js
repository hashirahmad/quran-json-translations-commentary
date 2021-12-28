const path = require('path')
const jsonfile = require('jsonfile')
const all = require('./json/allOfQuran.json')

async function run() {
    const topics = []
    for (let i = 0; i < all.length; i += 1) {
        const verse = all[i]
        topics.push(...verse.topics)
        console.log(`Added topics of ${verse.ch}:${verse.v}`)
    }
    const filepath = path.join(__dirname, 'topics.json')
    await jsonfile.writeFile(filepath, topics, { spaces: 4 })
}

run()
