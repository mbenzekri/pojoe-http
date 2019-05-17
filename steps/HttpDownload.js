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
const cef = require("cef-lib");
exports.declaration = {
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
                filename: { type: 'string', title: 'downloaded file name' },
                updated: { type: 'boolean', title: 'if true downloaded file updated (was out of date)' },
            }
        }
    },
};
class HttpDownload extends cef.Step {
    constructor(params) {
        super(exports.declaration, params);
        this.streams = {};
    }
    start() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    end() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    doit() {
        return __awaiter(this, void 0, void 0, function* () {
            let pojo = yield this.input('pojos');
            while (pojo !== cef.EOF) {
                // const url = this.params.url
                // const file = fs.createWriteStream()
                // got.stream(url, {})
                // got.stream(url).pipe();
                pojo = yield this.input('pojos');
            }
        });
    }
}
function create(params) { return new HttpDownload(params); }
exports.create = create;
;
//# sourceMappingURL=HttpDownload.js.map