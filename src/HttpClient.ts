import HttpClientInterface from './HttpClientInterface';
import RequestOptionsInterface from './RequestOptionsInterface';
import ResponseInterface from './ResponseInterface';
import Response from './Response';
import RequestInterface from './RequestInterface';
import Request from './Request';

import Headers from './Headers';
import ReadyState from './ReadyState';
import ResponseType from './ResponseType';

import {
    HttpClientError,
    HttpError,
    NetworkError,
    RequestAborted,
    RequestTimeout,
    StatusToError
} from './Errors';

import { isBlob, isFile, isFormData } from './Util';

export default class HttpClient implements HttpClientInterface {
    static defaultOptions: RequestOptionsInterface = {
        query: {},
        headers: {},
        timeout: 0,
        withCredentials: false,
        responseType: ResponseType.Undefined,
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
            key = key.replace(/-([a-z])/g, (m, c) => c.toUpperCase());
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
                const [ key, value ] = entry;
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

    put(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        return this.request('put', url, options);
    }

    patch(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        return this.request('patch', url, options);
    }

    delete(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface> {
        return this.request('delete', url, options);
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

    retry(request: RequestInterface): Promise<ResponseInterface> {
        return this.request(request.method, request.url, request);
    }

    private execute(request: RequestInterface): Promise<ResponseInterface> {
        const response = new Response();

        return new Promise((resolve, reject) => {
            let xhr = request.request = new XMLHttpRequest();
            xhr.open(request.method.toUpperCase(), this.buildUrl(request), request.async);

            xhr.withCredentials = request.withCredentials;
            xhr.timeout = request.timeout;
            xhr.responseType = request.responseType;

            const content = this.prepareRequestContent(request);
            this.prepareAuthorizationHeader(request, xhr);
            this.setHeaders(xhr, request);

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
        let content;
        if (request.json !== undefined) {
            content = JSON.stringify(request.json);
            if (undefined === request.headers.contentType) {
                request.headers.contentType = 'application/json';
            }
        } else {
            content = request.data;

            if (isFormData(content) || ((isBlob(content) || isFile(content)) && request.responseType)) {
                request.responseType = ResponseType.Undefined;
                delete request.headers.contentType;
            }
        }

        return content || null;
    }

    private prepareAuthorizationHeader(request: RequestInterface, xhr: XMLHttpRequest) {
        const auth = request.auth;
        if (undefined === auth) {
            return;
        }

        let authValue;
        if (typeof (auth) === 'string') {
            authValue = auth;
        } else if (auth.type && auth.credentials) {
            authValue = auth.type + ' ' + auth.credentials;
        } else if (auth.username && auth.password) {
            const password = unescape(encodeURIComponent(auth.password)) || '';
            authValue = 'basic' + btoa(auth.username + ':' + password);
        }

        if (!authValue) {
            return;
        }

        if (undefined === request.headers.authorization) {
            throw new HttpClientError('Using both authorization header and auth option.');
        }

        return request.headers.authorization = authValue;
    }

    private setHeaders(xhr: XMLHttpRequest, request: RequestInterface) {
        for (let key in request.headers) {
            const value = request.headers[key];

            // Convert camels to snakes (well dashes) - https://stackoverflow.com/a/56895309/4433067.
            key = key.replace(/(.)([A-Z][a-z]+)/g, '$1-$2')
                .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
                .toLowerCase();

            xhr.setRequestHeader(key, value);
        }

        return request;
    }

    private buildUrl(request: RequestInterface): string {
        // absolute url testing by protocol eg "https://".
        const absolute = /^[a-z]+:\/\//i.test(request.url);
        let url = (request.baseUrl && !absolute ? request.baseUrl : '') + request.url;

        if (request.query) {
            url = HttpClient.BuildQuery(url, request.query);
        }

        return url;
    }

    private onLoad(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        response.endTime = Date.now();
        response.request = request;

        response.data = !request.responseType || request.responseType === ResponseType.Text
            ? xhr.responseText
            : xhr.response;

        if (!request.responseType && response.data) {
            try {
                response.data = JSON.parse(response.data);
            } catch (e) {
            }
        }

        if (this.isSuccessStatus(response.status)) {
            if (typeof(this.options.onLoad) === 'function') {
                this.options.onLoad.call(this, event, request, response, xhr);
            }

            return response;
        }

        const instance = StatusToError.hasOwnProperty(response.status)
            ? StatusToError[response.status]
            : HttpError;

        const error = new instance(`Server returned ${response.status} ${response.statusText}.`);
        error.response = response;
        error.request = request;

        if (typeof(this.options.onLoadError) === 'function') {
            this.options.onLoad.call(this, event, error, xhr);
        }

        return error;
    }

    private onError(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        if (typeof(this.options.onError) === 'function') {
            this.options.onError.call(this, event, request, response, xhr);
        }

        response.request = request;
        response.endTime = Date.now();
        response.error = true;

        let error;
        if (ReadyState.Done === xhr.readyState && !xhr.status) {
            const messages = [ 'Network error, possible network problems?' ];
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

        if (typeof(this.options.onError) === 'function') {
            this.options.onError.call(this, event, error, xhr);
        }

        return error;
    }

    private onTimeout(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        response.request = request;
        response.endTime = Date.now();
        response.timeout = true;
        response.status = 408;

        const prefix = (request.retry ? ' attempt ' + (request.retries + 1) : '');
        const error = new RequestTimeout(`Request${prefix} to ${request.url} has timed out (${response.duration}ms).`);
        error.request = request;
        error.response = response;

        if (typeof(this.options.onTimeout) === 'function') {
            this.options.onTimeout.call(this, event, error, xhr);
        }

        return error;
    }

    private onAbort(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        response.request = request;
        response.endTime = Date.now();
        response.aborted = true;

        const error = new RequestAborted(`Request to ${request.url} has been aborted.`);
        error.request = request;
        error.response = response;

        if (typeof(this.options.onAbort) === 'function') {
            this.options.onAbort.call(this, event, error, xhr);
        }

        return error;
    }

    private onReadyStateChange(xhr: XMLHttpRequest, event: Event, request: RequestInterface, response: ResponseInterface) {
        switch (xhr.readyState) {
            case ReadyState.HeadersReceived:
                response.status = xhr.status;
                response.statusText = xhr.statusText;

                HttpClient.SetHeadersFromString(response.headers, xhr.getAllResponseHeaders());
                break;

            // case ReadyState.Done:
        }

        if (typeof(this.options.onReadyStateChange) === 'function') {
            this.options.onReadyStateChange.call(this, event, request, response, xhr);
        }
    }

    private onLoadStart(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        if (typeof(this.options.onLoadStart) === 'function') {
            this.options.onLoadStart.call(this, event, request, response, xhr);
        }
    }

    private onLoadEnd(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        if (typeof(this.options.onLoadEnd) === 'function') {
            this.options.onLoadEnd.call(this, event, request, response, xhr);
        }
    }

    private onProgress(xhr: XMLHttpRequest, event: ProgressEvent, request: RequestInterface, response: ResponseInterface) {
        if (typeof(this.options.onProgress) === 'function') {
            this.options.onProgress.call(this, event, request, response, xhr);
        }
    }

    private isSuccessStatus(status: number): boolean {
        return this.options.isSuccessStatus
            ? this.options.isSuccessStatus(status)
            : status >= 200 && status < 400;
    }
}
