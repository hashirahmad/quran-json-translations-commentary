const path = require('path')
const jsonfile = require('jsonfile')
const allTopics = require('./json/allTopics.json')

/**
 * It will get all the relevant verses mentioning given
 * `topic`.
 */
async function getMaxVerses({ topic }) {
    const all = []
    const file = path.join(__dirname, 'json/allOfQuran.json')
    const allOfQuran = await jsonfile.readFile(file)
    for (let j = 0; j < allOfQuran.length; j += 1) {
        const verse = allOfQuran[j]
        const filtered = verse.topics.filter((o) => o.topic === topic)
        if (filtered.length) {
            all.push(verse)
        }
    }
    return {
        length: all.length,
        verses: all,
    }
}

async function run() {
    const topics = {}
    const topicsArray = []
    for (let i = 0; i < allTopics.length; i += 1) {
        const topic = allTopics[i]
        topicsArray.push(topic.topic)
        console.log('Doing', topic.topic)
    }
    const uniqueTopics = [...new Set(topicsArray)]
    for (let i = 0; i < uniqueTopics.length; i += 1) {
        const topic = uniqueTopics[i]
        // eslint-disable-next-line no-await-in-loop
        const r = await getMaxVerses({ topic })
        topics[topic] = {
            id: i,
            maxVerses: r.length,
        }
        console.log('Getting max verses for', topic)
    }

    const filepath = path.join(__dirname, '/json/topics.json')
    await jsonfile.writeFile(filepath, topics, { spaces: 4 })
}

run()
