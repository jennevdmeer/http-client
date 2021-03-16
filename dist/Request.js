import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.define-property";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import HttpClient from './HttpClient';
import ResponseType from './ResponseType';
import ReadyState from './ReadyState';

var Request = /*#__PURE__*/function () {
  function Request(method, url, options) {
    _classCallCheck(this, Request);

    _defineProperty(this, "_method", void 0);

    _defineProperty(this, "url", void 0);

    _defineProperty(this, "request", void 0);

    _defineProperty(this, "auth", void 0);

    _defineProperty(this, "baseUrl", void 0);

    _defineProperty(this, "query", void 0);

    _defineProperty(this, "body", void 0);

    _defineProperty(this, "json", void 0);

    _defineProperty(this, "responseType", ResponseType.Undefined);

    _defineProperty(this, "timeout", void 0);

    _defineProperty(this, "withCredentials", false);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "retries", 0);

    _defineProperty(this, "_headers", {});

    this.method = method;
    this.url = url;
    this.startTime = Date.now();
    Object.assign(this, options);
  }

  _createClass(Request, [{
    key: "abort",
    value: function abort() {
      if (this.request.readyState === ReadyState.Done) {
        return;
      }

      this.request.abort();
    }
  }, {
    key: "headers",
    set: function set(headers) {
      HttpClient.SetHeaders(this._headers, headers);
    },
    get: function get() {
      return this._headers;
    }
  }, {
    key: "method",
    set: function set(method) {
      this._method = method.toUpperCase();
    },
    get: function get() {
      return this._method;
    }
  }]);

  return Request;
}();

export { Request as default };