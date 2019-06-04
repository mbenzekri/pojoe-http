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
const path_1 = require("path");
const uuid = require("uuid/v4");
const declaration = {
    gitid: 'mbenzekri/pojoe-http/steps/HttpDownload',
    title: 'get data to from url and write it to file',
    desc: 'this step get data from urls and writes corresponding resources to files',
    features: [
        "allow download urls resources for each inputed pojo url",
        "allow full directory path creation if missing",
        "allow update only if file is out of date",
        "allow do not overwrite existing files",
        "output success and failure urls downloadeds/files writtens",
        "output when success indicates update or not",
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
                url: { type: 'string', title: 'url of the downloaded resource' },
                filename: { type: 'string', title: 'target file name' },
                updated: { type: 'boolean', title: 'true if resource has been updated' },
            }
        },
        'failed': {
            title: 'failed to download files',
            properties: {
                url: { type: 'string', title: 'url of the downloaded resource' },
                filename: { type: 'string', title: 'target file name' },
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
        'update': {
            title: 'if true update only if file modification date is older than url resource ',
            type: 'boolean',
            default: 'true',
        },
    },
};
function streamurl(url, path) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            const dirname = path_1.dirname(path);
            const tmpfile = `${dirname}/${uuid()}.tmp`;
            got.head(url)
                .then(resp => {
                const flast = fs.existsSync(path) && fs.statSync(path).mtimeMs;
                const ulast = Date.parse(resp.headers["last-modified"]);
                if (flast && flast >= ulast)
                    return resolve(false);
                const file = fs.createWriteStream(tmpfile);
                const stream = got.stream(url.toString(), {});
                stream.on("end", () => {
                    fs.rename(tmpfile, path, err => {
                        fs.existsSync(tmpfile) && fs.unlink(tmpfile, _ => { });
                        if (!err)
                            return resolve(true);
                        reject(new Error(`fail to write file "${path}" due to ${err.message}`));
                    });
                });
                stream.on("error", (err) => {
                    fs.existsSync(tmpfile) && fs.unlink(tmpfile, _ => { });
                    reject(new Error(`fail to download url "${url}" to file ${path} due to ${err.message}`));
                });
                stream.pipe(file);
            }).catch(e => {
                fs.existsSync(tmpfile) && fs.unlink(tmpfile, _ => { });
                reject(new Error(`fail to download url "${url}" to file ${path} due to ${e.message}`));
            });
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
                return streamurl(url.toString(), filename.pathnormalize)
                    .then(updated => {
                    return this.output('downloaded', { url, filename, updated });
                }).catch(err => {
                    return this.output('failed', { url, filename, reason: err.message });
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