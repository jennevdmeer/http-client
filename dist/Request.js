"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
const ReadyState_1 = require("./ReadyState");
function authBasicHeader(ab) {
    let auth, username, password;
    if (typeof (ab) === 'string') {
        // Test username:password string or otherwise fallback to assumed encoded string.
        if (ab.indexOf(':') !== -1) {
            [username, password] = ab.split(':');
        }
        else {
            auth = ab;
        }
    }
    else {
        // If object check for key => value, or 'username': value, 'password': value.
        const keys = Object.keys(ab);
        if (keys.length === 2) {
            username = ab[keys[0]];
            password = ab[keys[1]];
        }
        else {
            username = keys[0];
            password = ab[keys[0]];
        }
    }
    if (username && password) {
        auth = btoa(`${username}:${password}`);
    }
    return { authorization: `basic ${auth}` };
}
class Request {
    constructor(method, url, options) {
        this.withCredentials = false;
        this.retries = 0;
        this._headers = {};
        this.method = method;
        this.url = url;
        this.startTime = Date.now();
        if (options.authBasic) {
            HttpClient_1.default.SetHeaders(options.headers, authBasicHeader(options.authBasic));
            delete options.authBasic;
        }
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