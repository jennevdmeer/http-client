import HttpClientInterface from './HttpClientInterface';
import RequestOptionsInterface from './RequestOptionsInterface';
import ResponseInterface from './ResponseInterface';
import Response from './Response';
import RequestInterface from './RequestInterface';
import Request from './Request';

import Headers from './Headers';
import ReadyState from './ReadyState';
import ResponseType from './ResponseType';

import { HttpClientError, HttpError, NetworkError, RequestAborted, RequestTimeout, StatusToError } from './Errors';

export default class HttpClient implements HttpClientInterface {
    static defaultOptions: RequestOptionsInterface = {
        query: {},
        headers: {},
        timeout: 0,
        withCredentials: false,
    };

    private options: RequestOptionsInterface = Object.assign({}, HttpClient.defaultOptions);

    static SetHeadersFromString(target, rawHeaders: string) {
        const results: Headers = {};

        const headers: string[] = rawHeaders.split(/[\r\n]+/);
        for (let i in headers) {
            const header = headers[i];
            if (!header) {
                continue;
            }

            const split: number = header.indexOf(': ');
            if (split === -1) {
                console.warn(`Found invalid header ${header}.`);
                continue;
            }

            let key: string = header.substr(0, split),
                value: any = header.substr(split + 2);

            if (!isNaN(parseInt(value))) {
                value = parseInt(value);
            }

            results[key] = value;
        }

        HttpClient.SetHeaders(target, results);
    }

    static SetHeaders(target, headers: Headers) {
        for (let key in headers) {
            if (!headers.hasOwnProperty(key)) {
                continue;
            }

            let value = headers[key];
            // Transform any snakes to camels.
            key = key.replace(/-([a-z])/, (m, c) => c.toUpperCase());
            if ((undefined === value) || (null === value)) {
                delete target[key];
            } else {
                target[key] = value;
            }
        }
    }

    static BuildQuery(url: string, params: { [key: string]: any }): string {
        let existing = url.indexOf('?'), query = {};
        if (existing !== -1) {
            // @ts-ignore
            const entries = (new URLSearchParams(url.substr(existing))).entries();

            for (let entry of entries) {
                const [key, value] = entry;
                query[key] = value;
            }

            url = url.substr(0, existing);
        }

        query = Object.assign(query, params);
        url += '?' + (new URLSearchParams(query as any)).toString();

        return url;
    }

    constructor(options?: RequestOptionsInterface) {
        Object.assign(this.options, HttpClient.defaultOptions, options);
    }

    get(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        return this.request('get', url, options);
    }

    post(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        return this.request('post', url, options);
    }

    request(method: string, url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        const request: RequestInterface = new Request(
            method,
            url,
            Object.assign({}, this.options, options),
        );

        if (undefined === request.retry) {
            return this.execute(request);
        }

        // Retry wrapper.
        let timeout;
        const caller = (resolve, reject) => this.execute(request)
            .then(f => resolve(f))
            .catch(error => {
                clearTimeout(timeout);

                // Stop when the delay function does not return a number.
                const delay = error.request.retry(++error.request.retries, error);
                if (typeof (delay) !== 'number') {
                    return reject(error);
                }

                console.error(error);

                timeout = setTimeout(() => {
                    request.startTime = Date.now();
                    caller(resolve, reject);
                }, delay);
            });

        return new Promise(caller);
    }

    private execute(request: RequestInterface): Promise<ResponseInterface> {
        const response = new Response();

        return new Promise((resolve, reject) => {
            let xhr = request.request = new XMLHttpRequest();
            xhr.withCredentials = request.withCredentials;
            xhr.timeout = request.timeout;
            xhr.responseType = request.responseType;

            xhr.open(request.method.toUpperCase(), this.buildUrl(request), true);

            const content = this.prepareRequestContent(request);
            this.prepareHeaders(request, xhr);

            xhr.onload = event => {
                const outcome = this.onLoad(xhr, event, request, response);

                return outcome instanceof HttpClientError
                    ? reject(outcome)
                    : resolve(outcome);
            };

            xhr.onabort = event => reject(this.onAbort(xhr, event, request, response));
            xhr.onerror = event => reject(this.onError(xhr, event, request, response));
            xhr.ontimeout = event => reject(this.onTimeout(xhr, event, request, response));
            xhr.onreadystatechange = event => this.onReadyStateChange(xhr, event, request, response);
            xhr.onloadstart = event => this.onLoadStart(xhr, event, request, response);
            xhr.onloadend = event => this.onLoadEnd(xhr, event, request, response);
            xhr.onprogress = event => this.onProgress(xhr, event, request, response);

            xhr.send(content);
        });
    }

    private prepareRequestContent(request) {
        let content = undefined;
        if (undefined !== request.body) {
            content = request.body;
            if (!request.headers.contentType) {
                request.headers.contentType = 'application/x-www-form-urlencoded';
            }

            if (request.headers.contentType === 'application/x-www-form-urlencoded' && typeof (request.body) === 'object') {
                content = (new URLSearchParams(request.body)).toString();
            }
        } else if (undefined !== request.json) {
            request.headers.contentType = 'application/json';

            content = typeof (request.json) === 'string'
                ? request.json
                : JSON.stringify(request.json);
        }

        return content;
    }

    private prepareHeaders(request: RequestInterface, xhr: XMLHttpRequest) {
        for (let key in request.headers) {
            const value = request.headers[key];

            // Convert camels to snakes (well dashes) - https://stackoverflow.com/a/56895309/4433067.
            key = key.replace(/(.)([A-Z][a-z]+)/, '$1-$2')
                .replace(/([a-z0-9])([A-Z])/, '$1-$2')
                .toLowerCase();

            xhr.setRequestHeader(key, value);
        }

        return request;
    }

    private buildUrl(request: RequestInterface): string {
        let url = (request.baseUrl ? request.baseUrl : '') + request.url;

        if (request.query) {
            url = HttpClient.BuildQuery(url, request.query);
        }

        return url;
    }

    private onError(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        response.request = request;
        response.endTime = Date.now();
        response.error = true;

        let error;
        if (ReadyState.Done === xhr.readyState && !xhr.status) {
            const messages = ['Network error, possible network problems?'];
            if (/^[a-z]+:\/\//.test(request.url) && request.url.indexOf(location.origin) < 0) {
                messages.push('Requested url seems different, are the proper CORS headers set up on the remote server?');
                if (xhr.withCredentials) {
                    messages.push('Request is also sent with credentials. Has the server set its Access-Control-Allow-Credentials to true?');
                }
            }

            error = new NetworkError(messages.join(' '));
        } else {
            error = new NetworkError('Network error, please check the connection.');
        }

        error.request = request;
        error.response = response;

        return error;
    }

    private onTimeout(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        response.request = request;
        response.endTime = Date.now();
        response.timeout = true;
        response.status = 408;

        const prefix = (request.retry ? ' attempt ' + (request.retries + 1) : '');
        const error = new RequestTimeout(`Request${prefix} to ${request.url} has timed out (${response.duration}ms).`);
        error.request = request;
        error.response = response;

        return error;
    }

    private onAbort(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        response.request = request;
        response.endTime = Date.now();
        response.aborted = true;

        const error = new RequestAborted(`Request to ${request.url} has been aborted.`);
        error.request = request;
        error.response = response;

        return error;
    }

    private onReadyStateChange(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        switch (xhr.readyState) {
            case ReadyState.HeadersReceived:
                response.status = xhr.status;
                response.statusText = xhr.statusText;

                HttpClient.SetHeadersFromString(response.headers, xhr.getAllResponseHeaders());
                break;
        }
    }

    private onLoadStart(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        // console.log('loadend', event, event.constructor.name);
    }

    private onLoadEnd(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        // console.log('loadend', event, event.constructor.name);
    }

    private onProgress(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        // console.log('progress', event, event.constructor.name);
    }

    private onLoad(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        const successful = this.isSuccessStatus(response.status);
        response.endTime = Date.now();
        response.request = request;

        let tryAndReturn = request.responseType;
        if (undefined === tryAndReturn) {
            // Attempt to guess content responseType by content type.
            const ct = response.headers.contentType;
            if (/json/.test(ct)) {
                tryAndReturn = ResponseType.Json;
            } else if (/(ht|x)ml/.test(ct)) {
                tryAndReturn = ResponseType.Document;
            }
        }

        switch (tryAndReturn) {
            case ResponseType.Json:
                try {
                    response.content = JSON.parse(xhr.responseText);
                    response.responseType = ResponseType.Json;
                } catch (error) {
                    error = new HttpClientError(`Error parsing response as JSON; ${error.message}.`, error);
                    response.content = xhr.response;
                    throw error;
                }
                break;

            case ResponseType.Document:
                response.content = xhr.responseXML;
                response.responseType = ResponseType.Document;
                break;

            default:
                response.content = xhr.response;
                response.responseType = request.responseType;
        }

        response.status = xhr.status;
        response.statusText = xhr.statusText;

        if (!successful) {
            const instance = undefined !== StatusToError[response.status]
                ? StatusToError[response.status]
                : HttpError;

            const error = new instance(`Server returned ${response.status} ${response.statusText}.`);
            error.response = response;
            error.request = request;

            return error;
        }

        return response;
    }

    private isSuccessStatus(status: number): boolean {
        return this.options.isSuccessStatus
            ? this.options.isSuccessStatus(status)
            : status >= 200 && status < 400;
    }
}
