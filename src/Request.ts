import HttpClient from './HttpClient';
import RequestOptionsInterface from './RequestOptionsInterface';
import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import ReadyState from './ReadyState';
import Headers from './Headers';

export default class Request implements RequestInterface {
    _method: string;
    url: string;
    request: XMLHttpRequest;

    auth: string | { [key: string]: string };
    baseUrl: string;
    query: object;
    body: string | object;
    json: string | object;
    responseType: ResponseType = ResponseType.Undefined;
    timeout: number;
    withCredentials: boolean = false;
    startTime: number;
    retries: number = 0;

    private _headers: Headers = {};

    constructor(method: string, url: string, options?: RequestOptionsInterface) {
        this.method = method;
        this.url = url;
        this.startTime = Date.now();

        Object.assign(this, options);
    }

    set headers(headers: Headers) {
        HttpClient.SetHeaders(this._headers, headers);
    }

    get headers(): Headers {
        return this._headers;
    }

    set method(method: string) {
        this._method = method.toUpperCase();
    }

    get method(): string {
        return this._method;
    }

    abort() {
        if (this.request.readyState === ReadyState.Done) {
            return;
        }

        this.request.abort();
    }
}

