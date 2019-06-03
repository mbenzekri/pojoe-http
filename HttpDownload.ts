import { Declaration, Step, ParamsMap, EOP } from 'pojoe/steps'
import { Url, Path } from 'pojoe/steps/types'
import * as got from 'got'
import * as path from 'path'
import * as fs from 'fs'
import { resolve } from 'dns';

const declaration: Declaration = {
    gitid: 'mbenzekri/cef-fs/steps/HttpDownload',
    title: 'get data to from url and write it to file',
    desc: 'this step get data from urls and writes corresponding data to files',
    features: [
        "allow writing data for each pojo url inputed",
        "allow full directory path creation if missing",
        "allow update only if file is out of date",
        "allow see got options ...",
    ],
    parameters: {
        'url': {
            title: 'the url to download',
            type: 'url',
            default: 'https://github.com/mbenzekri/pojoe-http/raw/master/README.md'
        },
        'filename': {
            title: 'the target filename for the downloaded resource',
            type: 'boolean',
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
    inputs: {
        'urls': {
            title: 'pojos with the infos to construct the url'
        }
    },
    outputs: {
        'files': {
            title: 'downloaded files',
            properties: {
                url: { type: 'url', title: 'url of the downloaded resource' },
                filename: { type: 'path', title: 'target file name' },
            }
        },
        'errors': {
            title: 'downloaded files',
            properties: {
                url: { type: 'url', title: 'url of the downloaded resource' },
                filename: { type: 'path', title: 'target file name' },
            }
        }
    },
}

export class HttpDownload extends Step {
    static readonly declaration = declaration
    streams: { [key: string]: fs.WriteStream } = {}
    constructor(params: ParamsMap) {
        super(declaration, params)
    }
    async streamurl(url: Url, path: Path) {
        const file = fs.createWriteStream(path.clean)
        const stream = got.stream(url, {}).pipe(file)
        stream.on("close", () => {
        })
        stream.on("error", (err) => {
            this.error(`fail to write file ${path.clean} due to ${err.message}`)
        })
    }
    async doit() {
        let pojo = await this.input('urls')
        while (pojo !== EOP) {
            const url: Url = this.params.url
            const path: Path = this.params.filename
            path.exists && this.error(`${path.clean} is an existing file or directory no overwriting`)
            if(!path.dirname.exists) {
                !this.params.createdir && this.error(`${path.dirname} didnot exist (no createdir)`)
                fs.mkdirSync(path.dirname.clean, { recursive: true })
            } 
            await this.streamurl(url, path)
            pojo = await this.input('urls')
        }
    }
}

Step.register(HttpDownload)
