import "core-js/modules/es.object.define-property";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import HttpClient from './HttpClient';

var Response = /*#__PURE__*/function () {
  function Response() {
    _classCallCheck(this, Response);

    _defineProperty(this, "request", void 0);

    _defineProperty(this, "status", void 0);

    _defineProperty(this, "statusText", void 0);

    _defineProperty(this, "responseType", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "successful", false);

    _defineProperty(this, "aborted", false);

    _defineProperty(this, "timeout", false);

    _defineProperty(this, "error", false);

    _defineProperty(this, "endTime", void 0);

    _defineProperty(this, "_headers", {});
  }

  _createClass(Response, [{
    key: "headers",
    set: function set(headers) {
      HttpClient.SetHeaders(this._headers, headers);
    },
    get: function get() {
      return this._headers;
    }
  }, {
    key: "duration",
    get: function get() {
      return this.endTime - this.request.startTime;
    }
  }]);

  return Response;
}();

export { Response as default };