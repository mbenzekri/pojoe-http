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
};
class HttpDownload extends steps_1.Step {
    constructor(params) {
        super(declaration, params);
        this.streams = {};
    }
    streamurl(url, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = fs.createWriteStream(path.clean);
            const stream = got.stream(url, {}).pipe(file);
            stream.on("close", () => {
            });
            stream.on("error", (err) => {
                this.error(`fail to write file ${path.clean} due to ${err.message}`);
            });
        });
    }
    doit() {
        return __awaiter(this, void 0, void 0, function* () {
            let pojo = yield this.input('urls');
            while (pojo !== steps_1.EOP) {
                const url = this.params.url;
                const path = this.params.filename;
                path.exists && this.error(`${path.clean} is an existing file or directory no overwriting`);
                if (!path.dirname.exists) {
                    !this.params.createdir && this.error(`${path.dirname} didnot exist (no createdir)`);
                    fs.mkdirSync(path.dirname.clean, { recursive: true });
                }
                yield this.streamurl(url, path);
                pojo = yield this.input('urls');
            }
        });
    }
}
HttpDownload.declaration = declaration;
exports.HttpDownload = HttpDownload;
steps_1.Step.register(HttpDownload);
//# sourceMappingURL=HttpDownload.js.map