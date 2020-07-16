"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
const ResponseType_1 = require("./ResponseType");
const ReadyState_1 = require("./ReadyState");
class Request {
    constructor(method, url, options) {
        this.responseType = ResponseType_1.default.Undefined;
        this.withCredentials = false;
        this.retries = 0;
        this._headers = {};
        this.method = method;
        this.url = url;
        this.startTime = Date.now();
        Object.assign(this, options);
    }
    set headers(headers) {
        HttpClient_1.default.SetHeaders(this._headers, headers);
    }
    get headers() {
        return this._headers;
    }
    set method(method) {
        this._method = method.toUpperCase();
    }
    get method() {
        return this._method;
    }
    abort() {
        if (this.request.readyState === ReadyState_1.default.Done) {
            return;
        }
        this.request.abort();
    }
}
exports.default = Request;
//# sourceMappingURL=Request.js.map