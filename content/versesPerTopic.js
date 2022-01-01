const path = require('path')
const jsonfile = require('jsonfile')
const topics = require('./json/topics.json')
const allOfQuran = require('./json/allOfQuran.json')

async function run() {
    const topicVerses = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const [key] of Object.entries(topics)) {
        const all = []
        for (let j = 0; j < allOfQuran.length; j += 1) {
            const verse = allOfQuran[j]
            const filtered = verse.topics.filter((o) => o.topic === key)
            if (filtered.length) {
                all.push(verse)
            }
        }
        topicVerses[key] = all
        console.log('Doing:', key)
    }
    const filepath = path.join(__dirname, 'topicVerses.json')
    await jsonfile.writeFile(filepath, topicVerses, { spaces: 4 })
}

run()
