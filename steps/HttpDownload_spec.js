"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-template-curly-in-string */
const steps_1 = require("pojoe/steps");
const fs = require("fs");
function cleandata() {
    if (fs.existsSync('/tmp/pojoe.zip'))
        fs.unlinkSync('/tmp/pojoe.zip');
    if (fs.existsSync('/tmp/pojoe-http.zip'))
        fs.unlinkSync('/tmp/pojoe-http.zip');
    if (fs.existsSync('/tmp/pojoe-zzz.zip'))
        fs.unlinkSync('/tmp/pojoe-zzz.zip');
    if (fs.existsSync('/tmp/com-01001.json.gz'))
        fs.unlinkSync('/tmp/com-01001.json.gz');
    if (!fs.existsSync('/tmp'))
        fs.mkdirSync('/tmp');
}
const tests = [
    {
        title: 'Testing HttpDownload existing url, unexisting url, createdir and no overwrite',
        stepid: 'mbenzekri/pojoe-http/steps/HttpDownload',
        args: {},
        globs: {},
        injected: {
            urls: [
                {
                    url: 'https://cadastre.data.gouv.fr/data/etalab-cadastre/2019-04-01/geojson/communes/01/01001/cadastre-01001-communes.json.gz',
                    filename: '/tmp/com-01001.json.gz'
                },
                {
                    url: 'https://github.com/mbenzekri/pojoe/archive/master.zip',
                    filename: '/tmp/pojoe.zip'
                },
                {
                    url: 'https://github.com/mbenzekri/pojoe-zzz/archive/master.zip',
                    filename: '/tmp/pojoe-zzz.zip'
                },
            ]
        },
        expected: {
            downloaded: [
                {
                    url: 'https://cadastre.data.gouv.fr/data/etalab-cadastre/2019-04-01/geojson/communes/01/01001/cadastre-01001-communes.json.gz',
                    filename: '/tmp/com-01001.json.gz',
                    updated: true,
                },
                {
                    url: 'https://github.com/mbenzekri/pojoe/archive/master.zip',
                    filename: '/tmp/pojoe.zip',
                    updated: true,
                },
            ],
            failed: [
                {
                    url: 'https://github.com/mbenzekri/pojoe-zzz/archive/master.zip',
                    filename: '/tmp/pojoe-zzz.zip',
                    reason: "fail to download url \"https://github.com/mbenzekri/pojoe-zzz/archive/master.zip\" to file \\tmp\\pojoe-zzz.zip due to Response code 404 (Not Found)"
                },
            ],
        },
        params: {
            'url': '${pojo.url}',
            'filename': '${pojo.filename}',
            'createdir': 'false',
            'overwite': 'true',
            'update': 'false',
        },
        onstart: cleandata,
    },
    {
        title: 'Testing HttpDownload url with existing file (testing update)',
        stepid: 'mbenzekri/pojoe-http/steps/HttpDownload',
        args: {},
        globs: {},
        injected: {
            urls: [
                {
                    url: 'https://cadastre.data.gouv.fr/data/etalab-cadastre/2019-04-01/geojson/communes/01/01001/cadastre-01001-communes.json.gz',
                    filename: '/tmp/com-01001.json.gz',
                },
            ]
        },
        expected: {
            downloaded: [
                {
                    url: 'https://cadastre.data.gouv.fr/data/etalab-cadastre/2019-04-01/geojson/communes/01/01001/cadastre-01001-communes.json.gz',
                    filename: '/tmp/com-01001.json.gz',
                    updated: false
                },
            ],
            failed: [],
        },
        params: {
            'url': '${pojo.url}',
            'filename': '${pojo.filename}',
            'createdir': 'false',
            'overwite': 'true',
            'update': 'true',
        },
    },
];
module.exports = steps_1.Testbed.run(tests);
//# sourceMappingURL=HttpDownload_spec.js.map