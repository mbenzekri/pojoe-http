import * as got from 'got'
import * as cef from 'cef-lib'
import * as path from 'path'
import * as fs from 'fs'

export const declaration: cef.Declaration = {
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
        'directory': {
            title: 'the directory where to put downloaded files',
            type: 'boolean',
            default: 'true',
        },
        'url': {
            title: 'the url to download',
            type: 'string',
            default: 'https://www.google.com'
        },
        'filename': {
            title: 'the target filename for the downloaded resource',
            type: 'boolean',
            default: 'true',
        },        
        'createdir': {
            title: 'if true create the missing directories for created file',
            type: 'boolean',
            default: 'true',
        },
        'update': {
            title: 'if true download only if file is out of date',
            type: 'string',
            default: null
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
                filename: { type:'string', title: 'downloaded file name'},
                updated: { type:'boolean', title: 'if true downloaded file updated (was out of date)'},
            }
        }
    },
}

class HttpDownload extends cef.Step {
    streams: { [key:string]: fs.WriteStream } = {}
    constructor (params: cef.ParamsMap) {
        super(declaration, params)
    }

    async start() {
    }
    async end() {
    }
    async doit() {
        let pojo = await this.input('pojos') 
        while (pojo !== cef.EOF) {
            // const url = this.params.url
            // const file = fs.createWriteStream()
            // got.stream(url, {})
            // got.stream(url).pipe();

            pojo = await this.input('pojos') 
        }
    }
}

export function  create(params: cef.ParamsMap) : HttpDownload  { return new HttpDownload(params) };
