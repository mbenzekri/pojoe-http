import { Declaration, Step, ParamsMap, EOP } from 'pojoe/steps'
import { Url, Path } from 'pojoe/steps/types'
import * as got from 'got'
import * as fs from 'fs'

const declaration: Declaration = {
    gitid: 'mbenzekri/pojoe-http/steps/HttpDownload',
    title: 'get data to from url and write it to file',
    desc: 'this step get data from urls and writes corresponding data to files',
    features: [
        "allow writing data for each pojo url inputed",
        "allow full directory path creation if missing",
        "allow update only if file is out of date",
        "allow see got options ...",
    ],
    inputs: {
        'urls': {
            title: 'pojos from which urls to download will be extracted'
        }
    },
    outputs: {
        'downloaded': {
            title: 'downloaded files',
            properties: {
                url: { type: 'url', title: 'url of the downloaded resource' },
                filename: { type: 'path', title: 'target file name' },
            }
        },
        'failed': {
            title: 'failed to download files',
            properties: {
                url: { type: 'url', title: 'url of the downloaded resource' },
                filename: { type: 'path', title: 'target file name' },
                reason: { type: 'string', title: 'reason for failure' },
            }
        }
    },    
    parameters: {
        'url': {
            title: 'the url to download',
            type: 'url',
            default: 'https://github.com/mbenzekri/pojoe-http/raw/master/README.md'
        },
        'filename': {
            title: 'the target filename for the downloaded resource',
            type: 'path',
            default: 'd:/tmp/README.md',
        },
        'createdir': {
            title: 'if true create the missing directories for created file',
            type: 'boolean',
            default: 'false',
        },
        'overwite': {
            title: 'if true overwrite existing file',
            type: 'boolean',
            default: 'false',
        },
    },

}

const opt: got.GotOptions<string> =  {}
async function streamurl(url: string, path: string) {
    return new Promise((resolve,reject)=> {
        const file = fs.createWriteStream(path)
        try {
            const stream = got.stream(url.toString(), {})
            stream.on("end", () => {
                resolve()
            })
            stream.on("error", (err) => {
                reject(`fail to write file "${path}" due to ${err.message}`)
            })
            stream.pipe(file)
        } catch(err) {
            reject(`fail to got.stream() url "${url}" to file "${path}" due to ${err.message}`)
        }
    })
}


export class HttpDownload extends Step {
    static readonly declaration = declaration
    constructor(params: ParamsMap) {
        super(declaration, params)
    }
    async donwload() {
        const url: string = this.params.url.toString()
        const filename: Path = this.params.filename
        const createdir: boolean = this.params.createdir
        const overwite: boolean = this.params.overwite
        if (filename.exists && !overwite) {
            return this.output('failed', { url, filename, reason: `${filename.toString()} is an existing file/directory and no overwriting allowed`})
        } else {
            const dirname = filename.dirname   
            if(!dirname.exists && createdir) {
                return this.output('failed', { url, filename, reason: `directory ${dirname} doesn't exist and no create directory allowed`})
            } else {
                // create dir
                fs.mkdirSync(dirname.pathnormalize, { recursive: true })
            }
            return streamurl(url,filename.pathnormalize)
            .then( _ => {
                return this.output('downloaded',{ url, filename})
            }).catch(err => {
                return this.output('failed', { url, filename, reason: err})
            })
        }
    }

    async input(inport: string, pojo: any) {
        if (inport === 'urls') {
            await this.donwload()
        }
    }
    async process() { 
        if (!this.inport('urls').isconnected) {
            await this.donwload()
        } 
    }

}

module.exports = Step.register(HttpDownload)
