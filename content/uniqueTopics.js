const path = require('path')
const jsonfile = require('jsonfile')
const allTopics = require('./json/allTopics.json')

async function run() {
    const topics = {}
    for (let i = 0; i < allTopics.length; i += 1) {
        const topic = allTopics[i]
        const exists = topics[topic.topic]
        if (exists) {
            exists.id += topic.id
            if (topic.verses) {
                exists.verses.push(...topic.verses.split(','))
            }
        } else {
            topics[topic.topic] = {
                id: topic.id,
                verses: (topic.verses && topic.verses.split(',')) || [],
            }
        }
        console.log('Doing:', topic.topic)
    }
    // eslint-disable-next-line guard-for-in, no-restricted-syntax
    for (const key in topics) {
        const { verses } = topics[key]
        const unique = [...new Set(verses)]
        const maxVerses = unique.length || 1
        delete topics[key].verses
        topics[key].maxVerses = maxVerses
    }
    const filepath = path.join(__dirname, '/json/topics.json')
    await jsonfile.writeFile(filepath, topics, { spaces: 4 })
}

run()
