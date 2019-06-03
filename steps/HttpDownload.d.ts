import { Declaration, Step, ParamsMap } from 'pojoe/steps';
export declare class HttpDownload extends Step {
    static readonly declaration: Declaration;
    constructor(params: ParamsMap);
    donwload(): Promise<void>;
    input(inport: string, pojo: any): Promise<void>;
    process(): Promise<void>;
}
