import { Declaration, Step, ParamsMap } from 'pojoe/steps';
import { Url, Path } from 'pojoe/steps/types';
import * as fs from 'fs';
export declare class HttpDownload extends Step {
    static readonly declaration: Declaration;
    streams: {
        [key: string]: fs.WriteStream;
    };
    constructor(params: ParamsMap);
    streamurl(url: Url, path: Path): Promise<void>;
    doit(): Promise<void>;
}
