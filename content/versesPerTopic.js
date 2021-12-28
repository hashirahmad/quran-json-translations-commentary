const path = require('path')
const jsonfile = require('jsonfile')
const topics = require('./json/topics.json')
const allOfQuran = require('./json/allOfQuran.json')

async function run() {
    const topicVerses = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(topics)) {
        const { id } = value
        for (let j = 0; j < allOfQuran.length; j += 1) {
            const verse = allOfQuran[j]
            const filtered = verse.topics.filter((o) => o.id === id)
            if (filtered.length) {
                if (Array.isArray(topicVerses[key])) {
                    topicVerses[key].push(verse)
                } else {
                    topicVerses[key] = [verse]
                }
            }
        }
        console.log('Doing:', key)
    }
    const filepath = path.join(__dirname, 'topicVerses.json')
    await jsonfile.writeFile(filepath, topicVerses, { spaces: 4 })
}

run()
