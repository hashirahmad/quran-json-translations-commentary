const jsonfile = require('jsonfile')
const path = require('path')
const metadata = require('../metadata')

function flatten(arr) {
    return arr.reduce(function (flat, toFlatten) {
        return flat.concat(
            Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
        )
    }, [])
}

async function run() {
    for (let i = 0; i < metadata.info.length; i += 1) {
        const chapter = metadata.info[i]

        const filepath = path.join(
            __dirname,
            `/chapters/${chapter.fileName}.json`
        )
        // eslint-disable-next-line no-await-in-loop
        const chapterContent = await jsonfile.readFile(filepath)
        const flattened = flatten(chapterContent)

        // eslint-disable-next-line no-await-in-loop
        await jsonfile.writeFile(filepath, flattened, { spaces: 4 })
        console.log(`✔️ Chapter ${chapter.chapter} flattened`)
    }
}

run()
