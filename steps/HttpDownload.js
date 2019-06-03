"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const steps_1 = require("pojoe/steps");
const got = require("got");
const fs = require("fs");
const declaration = {
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
};
const opt = {};
function streamurl(url, path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const file = fs.createWriteStream(path);
            try {
                const stream = got.stream(url.toString(), {});
                stream.on("end", () => {
                    resolve();
                });
                stream.on("error", (err) => {
                    reject(`fail to write file "${path}" due to ${err.message}`);
                });
                stream.pipe(file);
            }
            catch (err) {
                reject(`fail to got.stream() url "${url}" to file "${path}" due to ${err.message}`);
            }
        });
    });
}
class HttpDownload extends steps_1.Step {
    constructor(params) {
        super(declaration, params);
    }
    donwload() {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.params.url.toString();
            const filename = this.params.filename;
            const createdir = this.params.createdir;
            const overwite = this.params.overwite;
            if (filename.exists && !overwite) {
                return this.output('failed', { url, filename, reason: `${filename.toString()} is an existing file/directory and no overwriting allowed` });
            }
            else {
                const dirname = filename.dirname;
                if (!dirname.exists && createdir) {
                    return this.output('failed', { url, filename, reason: `directory ${dirname} doesn't exist and no create directory allowed` });
                }
                else {
                    // create dir
                    fs.mkdirSync(dirname.pathnormalize, { recursive: true });
                }
                return streamurl(url, filename.pathnormalize)
                    .then(_ => {
                    return this.output('downloaded', { url, filename });
                }).catch(err => {
                    return this.output('failed', { url, filename, reason: err });
                });
            }
        });
    }
    input(inport, pojo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (inport === 'urls') {
                yield this.donwload();
            }
        });
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.inport('urls').isconnected) {
                yield this.donwload();
            }
        });
    }
}
HttpDownload.declaration = declaration;
exports.HttpDownload = HttpDownload;
module.exports = steps_1.Step.register(HttpDownload);
//# sourceMappingURL=HttpDownload.js.map