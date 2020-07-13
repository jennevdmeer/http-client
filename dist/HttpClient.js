"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Response_1 = require("./Response");
const Request_1 = require("./Request");
const ReadyState_1 = require("./ReadyState");
const ResponseType_1 = require("./ResponseType");
const Errors_1 = require("./Errors");
class HttpClient {
    constructor(options) {
        this.options = Object.assign({}, HttpClient.defaultOptions);
        Object.assign(this.options, HttpClient.defaultOptions, options);
    }
    static SetHeadersFromString(target, rawHeaders) {
        const results = {};
        const headers = rawHeaders.split(/[\r\n]+/);
        for (let i in headers) {
            const header = headers[i];
            if (!header) {
                continue;
            }
            const split = header.indexOf(': ');
            if (split === -1) {
                console.warn(`Found invalid header ${header}.`);
                continue;
            }
            let key = header.substr(0, split), value = header.substr(split + 2);
            if (!isNaN(parseInt(value))) {
                value = parseInt(value);
            }
            results[key] = value;
        }
        HttpClient.SetHeaders(target, results);
    }
    static SetHeaders(target, headers) {
        for (let key in headers) {
            if (!headers.hasOwnProperty(key)) {
                continue;
            }
            let value = headers[key];
            // Transform any snakes to camels.
            key = key.replace(/-([a-z])/, (m, c) => c.toUpperCase());
            if ((undefined === value) || (null === value)) {
                delete target[key];
            }
            else {
                target[key] = value;
            }
        }
    }
    static BuildQuery(url, params) {
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
        url += '?' + (new URLSearchParams(query)).toString();
        return url;
    }
    get(url, options) {
        return this.request('get', url, options);
    }
    post(url, options) {
        return this.request('post', url, options);
    }
    request(method, url, options) {
        const request = new Request_1.default(method, url, Object.assign({}, this.options, options));
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
    execute(request) {
        const response = new Response_1.default();
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
                return outcome instanceof Errors_1.HttpClientError
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
    prepareRequestContent(request) {
        let content = undefined;
        if (undefined !== request.body) {
            content = request.body;
            if (!request.headers.contentType) {
                request.headers.contentType = 'application/x-www-form-urlencoded';
            }
            if (request.headers.contentType === 'application/x-www-form-urlencoded' && typeof (request.body) === 'object') {
                content = (new URLSearchParams(request.body)).toString();
            }
        }
        else if (undefined !== request.json) {
            request.headers.contentType = 'application/json';
            content = typeof (request.json) === 'string'
                ? request.json
                : JSON.stringify(request.json);
        }
        return content;
    }
    prepareHeaders(request, xhr) {
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
    buildUrl(request) {
        let url = (request.baseUrl ? request.baseUrl : '') + request.url;
        if (request.query) {
            url = HttpClient.BuildQuery(url, request.query);
        }
        return url;
    }
    onError(xhr, event, request, response) {
        response.request = request;
        response.endTime = Date.now();
        response.error = true;
        let error;
        if (ReadyState_1.default.Done === xhr.readyState && !xhr.status) {
            const messages = ['Network error, possible network problems?'];
            if (/^[a-z]+:\/\//.test(request.url) && request.url.indexOf(location.origin) < 0) {
                messages.push('Requested url seems different, are the proper CORS headers set up on the remote server?');
                if (xhr.withCredentials) {
                    messages.push('Request is also sent with credentials. Has the server set its Access-Control-Allow-Credentials to true?');
                }
            }
            error = new Errors_1.NetworkError(messages.join(' '));
        }
        else {
            error = new Errors_1.NetworkError('Network error, please check the connection.');
        }
        error.request = request;
        error.response = response;
        return error;
    }
    onTimeout(xhr, event, request, response) {
        response.request = request;
        response.endTime = Date.now();
        response.timeout = true;
        response.status = 408;
        const prefix = (request.retry ? ' attempt ' + (request.retries + 1) : '');
        const error = new Errors_1.RequestTimeout(`Request${prefix} to ${request.url} has timed out (${response.duration}ms).`);
        error.request = request;
        error.response = response;
        return error;
    }
    onAbort(xhr, event, request, response) {
        response.request = request;
        response.endTime = Date.now();
        response.aborted = true;
        const error = new Errors_1.RequestAborted(`Request to ${request.url} has been aborted.`);
        error.request = request;
        error.response = response;
        return error;
    }
    onReadyStateChange(xhr, event, request, response) {
        switch (xhr.readyState) {
            case ReadyState_1.default.HeadersReceived:
                response.status = xhr.status;
                response.statusText = xhr.statusText;
                HttpClient.SetHeadersFromString(response.headers, xhr.getAllResponseHeaders());
                break;
        }
    }
    onLoadStart(xhr, event, request, response) {
        // console.log('loadend', event, event.constructor.name);
    }
    onLoadEnd(xhr, event, request, response) {
        // console.log('loadend', event, event.constructor.name);
    }
    onProgress(xhr, event, request, response) {
        // console.log('progress', event, event.constructor.name);
    }
    onLoad(xhr, event, request, response) {
        const successful = this.isSuccessStatus(response.status);
        response.endTime = Date.now();
        response.request = request;
        let tryAndReturn = request.responseType;
        if (undefined === tryAndReturn) {
            // Attempt to guess content responseType by content type.
            const ct = response.headers.contentType;
            if (/json/.test(ct)) {
                tryAndReturn = ResponseType_1.default.Json;
            }
            else if (/(ht|x)ml/.test(ct)) {
                tryAndReturn = ResponseType_1.default.Document;
            }
        }
        switch (tryAndReturn) {
            case ResponseType_1.default.Json:
                try {
                    response.content = xhr.response;
                    response.responseType = ResponseType_1.default.Json;
                }
                catch (error) {
                    error = new Errors_1.HttpClientError(`Error consuming json request; ${error.message}.`, error);
                    response.content = xhr.response;
                    throw error;
                }
                break;
            case ResponseType_1.default.Document:
                response.content = xhr.responseXML;
                response.responseType = ResponseType_1.default.Document;
                break;
            default:
                response.content = xhr.response;
                response.responseType = request.responseType;
        }
        if (!successful) {
            const instance = undefined !== Errors_1.StatusToError[response.status]
                ? Errors_1.StatusToError[response.status]
                : Errors_1.HttpError;
            const error = new instance(`Server returned ${response.status} ${response.statusText}.`);
            error.response = response;
            error.request = request;
            return error;
        }
        return response;
    }
    isSuccessStatus(status) {
        return this.options.isSuccessStatus
            ? this.options.isSuccessStatus(status)
            : status >= 200 && status < 400;
    }
}
HttpClient.defaultOptions = {
    query: {},
    headers: {},
    timeout: 0,
    withCredentials: false,
};
exports.default = HttpClient;
//# sourceMappingURL=HttpClient.js.map