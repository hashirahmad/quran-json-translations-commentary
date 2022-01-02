const path = require('path')
const jsonfile = require('jsonfile')
const sortedTopicsDESC = require('./json/sortedTopicsDESC.json')

async function run() {
    const all = []
    const file = path.join(__dirname, 'json/allOfQuran.json')
    const allOfQuran = await jsonfile.readFile(file)
    for (let j = 0; j < allOfQuran.length; j += 1) {
        const verse = allOfQuran[j]
        const { topics } = verse
        delete verse.topics
        verse.topics = topics
            .map((o) => sortedTopicsDESC.find((p) => o.topic === p.topic))
            .sort((a, b) => parseFloat(b.maxVerses) - parseFloat(a.maxVerses))
        all.push(verse)
    }
    const filepath = path.join(
        __dirname,
        '/json/allOfQuranWithTopicsSortedDesc.json'
    )
    await jsonfile.writeFile(filepath, all, { spaces: 4 })
}

run()
