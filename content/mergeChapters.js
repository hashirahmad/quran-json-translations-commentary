const jsonfile = require('jsonfile')
const path = require('path')
const metadata = require('../metadata')

async function run() {
    const bigArray = []
    const allOfQuranPath = path.join(__dirname, 'allOfQuran.json')
    for (let i = 0; i < metadata.info.length; i += 1) {
        const chapter = metadata.info[i]

        const filepath = path.join(
            __dirname,
            `/chapters/${chapter.fileName}.json`
        )
        // eslint-disable-next-line no-await-in-loop
        const chapterContent = await jsonfile.readFile(filepath)
        bigArray.push(...chapterContent)

        console.log(`✔️ Chapter ${chapter.chapter} merged`)
    }
    await jsonfile.writeFile(allOfQuranPath, bigArray, { spaces: 4 })
    console.log('All merged 💯')
}

run()
