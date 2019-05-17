import * as cef from 'cef-lib';
import * as fs from 'fs';
export declare const declaration: cef.Declaration;
declare class HttpGet extends cef.Step {
    streams: {
        [key: string]: fs.WriteStream;
    };
    constructor(params: cef.ParamsMap);
    start(): Promise<void>;
    end(): Promise<void>;
    doit(): Promise<void>;
}
export declare function create(params: cef.ParamsMap): HttpGet;
export {};
