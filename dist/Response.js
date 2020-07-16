"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpClient_1 = require("./HttpClient");
class Response {
    constructor() {
        this.successful = false;
        this.aborted = false;
        this.timeout = false;
        this.error = false;
        this._headers = {};
    }
    set headers(headers) {
        HttpClient_1.default.SetHeaders(this._headers, headers);
    }
    get headers() {
        return this._headers;
    }
    get duration() {
        return this.endTime - this.request.startTime;
    }
}
exports.default = Response;
//# sourceMappingURL=Response.js.map