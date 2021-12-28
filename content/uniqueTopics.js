const path = require('path')
const jsonfile = require('jsonfile')
const allTopics = require('./json/allTopics.json')

async function run() {
    const topics = {}
    for (let i = 0; i < allTopics.length; i += 1) {
        const topic = allTopics[i]
        topics[topic.topic] = {
            id: topic.id,
            maxVerses: (topic.verses && topic.verses.split(',').length) || 1,
        }
        console.log('Doing:', topic.topic)
    }
    const filepath = path.join(__dirname, 'topics.json')
    await jsonfile.writeFile(filepath, topics, { spaces: 4 })
}

run()
