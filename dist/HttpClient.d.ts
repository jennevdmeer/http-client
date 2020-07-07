import HttpClientInterface from './HttpClientInterface';
import RequestOptionsInterface from './RequestOptionsInterface';
import ResponseInterface from './ResponseInterface';
import Headers from './Headers';
export default class HttpClient implements HttpClientInterface {
    static defaultOptions: RequestOptionsInterface;
    private options;
    static SetHeadersFromString(target: any, rawHeaders: string): void;
    static SetHeaders(target: any, headers: Headers): void;
    static BuildQuery(url: string, params: {
        [key: string]: any;
    }): string;
    constructor(options?: RequestOptionsInterface);
    get(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    post(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    request(method: string, url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    private execute;
    private prepareRequestContent;
    private prepareHeaders;
    private buildUrl;
    private onError;
    private onTimeout;
    private onAbort;
    private onReadyStateChange;
    private onLoadStart;
    private onLoadEnd;
    private onProgress;
    private onLoad;
    private isSuccessStatus;
}
