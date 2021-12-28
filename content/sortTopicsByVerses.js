const path = require('path')
const jsonfile = require('jsonfile')
const topics = require('./json/topics.json')

async function run() {
    const sorted = Object.values(topics).sort(
        (a, b) => parseFloat(b.maxVerses) - parseFloat(a.maxVerses)
    )
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(topics)) {
        const { id } = value
        for (let i = 0; i < sorted.length; i += 1) {
            const item = sorted[i]
            if (id === item.id) {
                item.topic = key
            }
        }
    }
    const filepath = path.join(__dirname, 'sortedTopics.json')
    await jsonfile.writeFile(filepath, sorted, { spaces: 4 })
}

run()
