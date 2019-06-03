/* eslint-disable no-template-curly-in-string */
import { Testcase, Testbed } from 'pojoe/steps'
import * as fs from 'fs'

function cleandata() {
    if (fs.existsSync('/tmp/pojoe.zip')) fs.unlinkSync('/tmp/pojoe.zip')
    if (fs.existsSync('/tmp/pojoe-http.zip')) fs.unlinkSync('/tmp/pojoe-http.zip')
    if (fs.existsSync('/tmp/pojoe-zzz.zip')) fs.unlinkSync('/tmp/pojoe-zzz.zip')
    if (!fs.existsSync('/tmp')) fs.mkdirSync('/tmp')
}
const tests: Testcase[] = [
    {
        title: 'Testing HttpDownload existing url, unexisting url, createdir and no overwrite',
        stepid: 'mbenzekri/pojoe-http/steps/HttpDownload',
        args: {},
        globs: {
            PATH: { value: '/tmp', type: 'string', desc: 'the data root dir' }
        },
        injected: {
            urls: [
                { url: 'https://github.com/mbenzekri/pojoe/archive/master.zip', filename: '/tmp/pojoe.zip' },
                { url: 'https://github.com/mbenzekri/pojoe-http/archive/master.zip', filename: '/tmp/pojoe-http.zip' },
                { url: 'https://github.com/mbenzekri/pojoe-zzz/archive/master.zip', filename: '/tmp/pojoe-zzz.zip' },
            ]
        },
        expected: {
            downloaded: [
                { url: 'https://github.com/mbenzekri/pojoe/archive/master.zip', filename: '/tmp/pojoe.zip' },
                { url: 'https://github.com/mbenzekri/pojoe-http/archive/master.zip', filename: '/tmp/pojoe-http.zip' },
            ],
            failed: [
                { url: 'https://github.com/mbenzekri/pojoe-zzz/archive/master.zip', filename: '/tmp/pojoe-zzz.zip', reason: 'fail to write file \"\\tmp\\pojoe-zzz.zip\" due to Response code 404 (Not Found)'},
            ],

        },
        params: {
            'url': '${pojo.url}',
            'filename': '${pojo.filename}',
            'createdir': 'false',
            'overwite': 'false',
        },
        onstart: cleandata,
        onend: cleandata
    }
]

module.exports = Testbed.run(tests)
