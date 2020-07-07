import HttpClient from './HttpClient';
import RequestOptionsInterface from './RequestOptionsInterface';
import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import ReadyState from './ReadyState';
import Headers from './Headers';

function authBasicHeader(ab): { [key: string]: string } {
    let auth, username, password;

    if (typeof (ab) === 'string') {
        // Test username:password string or otherwise fallback to assumed encoded string.
        if (ab.indexOf(':') !== -1) {
            [username, password] = ab.split(':');
        } else {
            auth = ab;
        }
    } else {
        // If object check for key => value, or 'username': value, 'password': value.
        const keys = Object.keys(ab);
        if (keys.length === 2) {
            username = ab[keys[0]];
            password = ab[keys[1]];
        } else {
            username = keys[0];
            password = ab[keys[0]];
        }
    }

    if (username && password) {
        auth = btoa(`${username}:${password}`);
    }

    return {authorization: `basic ${auth}`};
}

export default class Request implements RequestInterface {
    _method: string;
    url: string;
    request: XMLHttpRequest;

    authBasic: string | { [key: string]: string };
    baseUrl: string;
    query: object;
    body: string | object;
    json: string | object;
    responseType?: ResponseType;
    timeout: number;
    withCredentials: boolean = false;
    startTime: number;
    retries: number = 0;

    private _headers: Headers = {};

    constructor(method: string, url: string, options?: RequestOptionsInterface) {
        this.method = method;
        this.url = url;
        this.startTime = Date.now();

        if (options.authBasic) {
            HttpClient.SetHeaders(options.headers, authBasicHeader(options.authBasic));

            delete options.authBasic;
        }

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

