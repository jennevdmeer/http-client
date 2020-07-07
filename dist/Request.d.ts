import RequestOptionsInterface from './RequestOptionsInterface';
import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import Headers from './Headers';
export default class Request implements RequestInterface {
    _method: string;
    url: string;
    request: XMLHttpRequest;
    authBasic: string | {
        [key: string]: string;
    };
    baseUrl: string;
    query: object;
    body: string | object;
    json: string | object;
    responseType?: ResponseType;
    timeout: number;
    withCredentials: boolean;
    startTime: number;
    retries: number;
    private _headers;
    constructor(method: string, url: string, options?: RequestOptionsInterface);
    set headers(headers: Headers);
    get headers(): Headers;
    set method(method: string);
    get method(): string;
    abort(): void;
}
