const axios = require('axios').default
const jsonfile = require('jsonfile')
const path = require('path')
const metadata = require('../metadata')

/**
 * Will sleep for `n` seconds
 */
async function sleep(n) {
    return new Promise((res) => {
        setTimeout(() => res(true), n * 1000)
    })
}

async function run() {
    const url = 'https://www.alislam.org/quran/read/api.php'
    const body = {
        v5: true,
        split: 0,
        ur: true,
        f: 1,
    }
    for (let i = 0; i < metadata.info.length; i += 1) {
        const response = []
        const chapter = metadata.info[i]
        for (let j = 0; j < chapter.verses.length; j += 1) {
            const tenPartVerses = chapter.verses[j]
            const query = `?action=chapter&v=${chapter.chapter}:${tenPartVerses}`
            const fullUrl = url + query
            // eslint-disable-next-line no-await-in-loop
            const r = await axios.post(fullUrl, body)
            // eslint-disable-next-line no-await-in-loop
            await sleep(3)
            response.push(r.data)
            console.log(`✔️ Chapter ${chapter.chapter} verses ${tenPartVerses}`)
        }

        const filepath = path.join(__dirname, `${chapter.fileName}.json`)
        // eslint-disable-next-line no-await-in-loop
        await jsonfile.writeFile(filepath, response, { spaces: 4 })
        console.log(`\n✔️ Chapter ${chapter.chapter} done 💯\n`)
    }
}

run()
