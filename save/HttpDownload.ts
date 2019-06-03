// import { Declaration, Step, ParamsMap, EOP } from 'pojoe/steps'
// import { Url, Path } from 'pojoe/steps/types'
// import * as got from 'got'
// import * as fs from 'fs'

// const declaration: Declaration = {
//     gitid: 'mbenzekri/cef-fs/steps/HttpDownload',
//     title: 'get data to from url and write it to file',
//     desc: 'this step get data from urls and writes corresponding data to files',
//     features: [
//         "allow writing data for each pojo url inputed",
//         "allow full directory path creation if missing",
//         "allow update only if file is out of date",
//         "allow see got options ...",
//     ],
//     inputs: {
//         'urls': {
//             title: 'pojos from which urls to download will be extracted'
//         }
//     },
//     outputs: {
//         'downloaded': {
//             title: 'downloaded files',
//             properties: {
//                 url: { type: 'url', title: 'url of the downloaded resource' },
//                 filename: { type: 'path', title: 'target file name' },
//             }
//         },
//         'failed': {
//             title: 'failed to download files',
//             properties: {
//                 url: { type: 'url', title: 'url of the downloaded resource' },
//                 filename: { type: 'path', title: 'target file name' },
//                 reason: { type: 'string', title: 'reason for failure' },
//             }
//         }
//     },    
//     parameters: {
//         'url': {
//             title: 'the url to download',
//             type: 'url',
//             default: 'https://github.com/mbenzekri/pojoe-http/raw/master/README.md'
//         },
//         'filename': {
//             title: 'the target filename for the downloaded resource',
//             type: 'path',
//             default: 'd:/tmp/README.md',
//         },
//         'createdir': {
//             title: 'if true create the missing directories for created file',
//             type: 'boolean',
//             default: 'false',
//         },
//         'overwite': {
//             title: 'if true overwrite existing file',
//             type: 'boolean',
//             default: 'false',
//         },
//     },

// }


// async function streamurl(url: Url, path: Path) {
//     return new Promise((resolve,reject)=> {
//         const file = fs.createWriteStream(path.pathnormalize)
//         const stream = got.stream(url, {}).pipe(file)
//         stream.on("close", () => {
//             resolve()
//         })
//         stream.on("error", (err) => {
//             reject(`fail to write file ${path.pathnormalize} due to ${err.message}`)
//         })
//     })
// }


// export class HttpDownload extends Step {
//     static readonly declaration = declaration
//     constructor(params: ParamsMap) {
//         super(declaration, params)
//     }
//     async donwload() {
//         const url: Url = this.params.url
//         const filename: Path = this.params.filename
//         const createdir: boolean = this.params.createdir
//         const overwite: boolean = this.params.overwite
//         if (filename.exists && !overwite) {
//             return this.output('failed', { url, filename, reason: `${filename.pathnormalize} is an existing file or directory no overwriting allowed`})
//         } else {
//             const dirname = filename.dirname   
//             if(!dirname.exists && createdir) {
//                 return this.output('failed', { url, filename, reason: `directory ${dirname} doesn't exist and no create directory allowed`})
//             } else {
//                 // create dir
//                 fs.mkdirSync(dirname.pathnormalize, { recursive: true })
//             }
//             return streamurl(url, filename)
//         }
//     }

//     async input(inport: string, pojo: any) {
//         if (inport === 'urls') {
//             await this.donwload()
//         }
//     }
//     async process() { 
//         if (!this.inport('urls').isconnected) {
//             await this.donwload()
//         } 
//     }

// }

// module.exports = Step.register(HttpDownload)

import { Step, Declaration, ParamsMap } from 'pojoe/steps'

const declaration: Declaration = {
    gitid: 'mbenzekri/pojoe/steps/HttpDownload',
    title: 'filter pojos',
    desc: ' filter each inputed pojo through a boolean expression',
    inputs: {
        'pojos': {
            title: 'pojo to filter'
        }
    },
    outputs: {
        'success': {
            title: 'filtered pojos'
        },
        'failure': {
            title: 'filtered pojos'
        },
    },
    parameters: {
        'test': {
            title: 'filter expression',
            type: 'boolean',
            default: 'true'
        },
    }
}

export class PojoFilter extends Step {
    static readonly declaration = declaration
    constructor (params: ParamsMap) {
        super(declaration, params)
    }
    async input(inport:string, pojo: any) {
        if (inport ===  'pojos') {
            const target = this.params.test ? 'success' : 'failure'
            await this.output(target,pojo)
        }
    }
}

Step.register(PojoFilter);
