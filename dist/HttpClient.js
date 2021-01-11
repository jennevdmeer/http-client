import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.from";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array.join";
import "core-js/modules/es.array.slice";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.define-property";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.parse-int";
import "core-js/modules/es.promise";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/es.string.replace";
import "core-js/modules/es.string.split";
import "core-js/modules/web.dom-collections.iterator";
import "core-js/modules/web.timers";
import "core-js/modules/web.url";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import Response from './Response';
import Request from './Request';
import ReadyState from './ReadyState';
import ResponseType from './ResponseType';
import { HttpClientError, HttpError, NetworkError, RequestAborted, RequestTimeout, StatusToError } from './Errors';
import { isBlob, isFile, isFormData } from './Util';

var HttpClient = /*#__PURE__*/function () {
  _createClass(HttpClient, null, [{
    key: "SetHeadersFromString",
    value: function SetHeadersFromString(target, rawHeaders) {
      var results = {};
      var headers = rawHeaders.split(/[\r\n]+/);

      for (var i in headers) {
        var header = headers[i];

        if (!header) {
          continue;
        }

        var split = header.indexOf(': ');

        if (split === -1) {
          console.warn("Found invalid header ".concat(header, "."));
          continue;
        }

        var _key = header.substr(0, split),
            value = header.substr(split + 2);

        if (!isNaN(parseInt(value))) {
          value = parseInt(value);
        }

        results[_key] = value;
      }

      HttpClient.SetHeaders(target, results);
    }
  }, {
    key: "SetHeaders",
    value: function SetHeaders(target, headers) {
      for (var _key2 in headers) {
        if (!headers.hasOwnProperty(_key2)) {
          continue;
        }

        var value = headers[_key2]; // Transform any snakes to camels.

        _key2 = _key2.replace(/-([a-z])/g, function (m, c) {
          return c.toUpperCase();
        });

        if (undefined === value || null === value) {
          delete target[_key2];
        } else {
          target[_key2] = value;
        }
      }
    }
  }, {
    key: "BuildQuery",
    value: function BuildQuery(url, params) {
      var existing = url.indexOf('?'),
          query = {};

      if (existing !== -1) {
        // @ts-ignore
        var entries = new URLSearchParams(url.substr(existing)).entries();

        var _iterator = _createForOfIteratorHelper(entries),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var entry = _step.value;

            var _entry = _slicedToArray(entry, 2),
                _key3 = _entry[0],
                value = _entry[1];

            query[_key3] = value;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        url = url.substr(0, existing);
      }

      query = Object.assign(query, params);
      url += '?' + new URLSearchParams(query).toString();
      return url;
    }
  }]);

  function HttpClient(options) {
    _classCallCheck(this, HttpClient);

    _defineProperty(this, "options", Object.assign({}, HttpClient.defaultOptions));

    Object.assign(this.options, HttpClient.defaultOptions, options);
  }

  _createClass(HttpClient, [{
    key: "get",
    value: function get(url, options) {
      return this.request('get', url, options);
    }
  }, {
    key: "post",
    value: function post(url, options) {
      return this.request('post', url, options);
    }
  }, {
    key: "put",
    value: function put(url, options) {
      return this.request('put', url, options);
    }
  }, {
    key: "patch",
    value: function patch(url, options) {
      return this.request('patch', url, options);
    }
  }, {
    key: "delete",
    value: function _delete(url, options) {
      return this.request('delete', url, options);
    }
  }, {
    key: "request",
    value: function request(method, url, options) {
      var _this = this;

      var request = new Request(method, url, Object.assign({}, this.options, options));

      if (undefined === request.retry) {
        return this.execute(request);
      } // Retry wrapper.


      var timeout;

      var caller = function caller(resolve, reject) {
        return _this.execute(request).then(function (f) {
          return resolve(f);
        })["catch"](function (error) {
          clearTimeout(timeout); // Stop when the delay function does not return a number.

          var delay = error.request.retry(++error.request.retries, error);

          if (typeof delay !== 'number') {
            return reject(error);
          }

          console.error(error);
          timeout = setTimeout(function () {
            request.startTime = Date.now();
            caller(resolve, reject);
          }, delay);
        });
      };

      return new Promise(caller);
    }
  }, {
    key: "retry",
    value: function retry(request) {
      return this.request(request.method, request.url, request);
    }
  }, {
    key: "execute",
    value: function execute(request) {
      var _this2 = this;

      var response = new Response();
      return new Promise(function (resolve, reject) {
        var xhr = request.request = new XMLHttpRequest();
        xhr.open(request.method.toUpperCase(), _this2.buildUrl(request), true);
        xhr.withCredentials = request.withCredentials;
        xhr.timeout = request.timeout;
        xhr.responseType = request.responseType;

        var content = _this2.prepareRequestContent(request);

        _this2.prepareAuthorizationHeader(request, xhr);

        _this2.setHeaders(xhr, request);

        xhr.onload = function (event) {
          var outcome = _this2.onLoad(xhr, event, request, response);

          return outcome instanceof HttpClientError ? reject(outcome) : resolve(outcome);
        };

        xhr.onabort = function (event) {
          return reject(_this2.onAbort(xhr, event, request, response));
        };

        xhr.onerror = function (event) {
          return reject(_this2.onError(xhr, event, request, response));
        };

        xhr.ontimeout = function (event) {
          return reject(_this2.onTimeout(xhr, event, request, response));
        };

        xhr.onreadystatechange = function (event) {
          return _this2.onReadyStateChange(xhr, event, request, response);
        }; // xhr.onloadstart = event => this.onLoadStart(xhr, event, request, response);
        // xhr.onloadend = event => this.onLoadEnd(xhr, event, request, response);
        // xhr.onprogress = event => this.onProgress(xhr, event, request, response);


        xhr.send(content);
      });
    }
  }, {
    key: "prepareRequestContent",
    value: function prepareRequestContent(request) {
      var content;

      if (request.json !== undefined) {
        content = JSON.stringify(request.json);

        if (undefined === request.headers.contentType) {
          request.headers.contentType = 'application/json';
        }
      } else {
        content = request.body;

        if (isFormData(content) || (isBlob(content) || isFile(content)) && request.responseType) {
          request.responseType = ResponseType.Undefined;
          delete request.headers.contentType;
        }
      }

      return content || null;
    }
  }, {
    key: "prepareAuthorizationHeader",
    value: function prepareAuthorizationHeader(request, xhr) {
      var auth = request.auth;

      if (undefined === auth) {
        return;
      }

      var authValue;

      if (typeof auth === 'string') {
        authValue = auth;
      } else if (auth.type && auth.credentials) {
        authValue = auth.type + ' ' + auth.credentials;
      } else if (auth.username && auth.password) {
        var password = unescape(encodeURIComponent(auth.password)) || '';
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
  }, {
    key: "setHeaders",
    value: function setHeaders(xhr, request) {
      for (var _key4 in request.headers) {
        var value = request.headers[_key4]; // Convert camels to snakes (well dashes) - https://stackoverflow.com/a/56895309/4433067.

        _key4 = _key4.replace(/(.)([A-Z][a-z]+)/g, '$1-$2').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
        xhr.setRequestHeader(_key4, value);
      }

      return request;
    }
  }, {
    key: "buildUrl",
    value: function buildUrl(request) {
      var url = (request.baseUrl ? request.baseUrl : '') + request.url;

      if (request.query) {
        url = HttpClient.BuildQuery(url, request.query);
      }

      return url;
    }
  }, {
    key: "onLoad",
    value: function onLoad(xhr, event, request, response) {
      response.endTime = Date.now();
      response.request = request;
      response.data = !request.responseType || request.responseType === ResponseType.Text ? xhr.responseText : xhr.response;

      if (!request.responseType && response.data) {
        try {
          response.data = JSON.parse(response.data);
        } catch (e) {}
      }

      if (this.isSuccessStatus(response.status)) {
        return response;
      }

      var instance = StatusToError.hasOwnProperty(response.status) ? StatusToError[response.status] : HttpError;
      var error = new instance("Server returned ".concat(response.status, " ").concat(response.statusText, "."));
      error.response = response;
      error.request = request;
      return error;
    }
  }, {
    key: "onError",
    value: function onError(xhr, event, request, response) {
      response.request = request;
      response.endTime = Date.now();
      response.error = true;
      var error;

      if (ReadyState.Done === xhr.readyState && !xhr.status) {
        var messages = ['Network error, possible network problems?'];

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
  }, {
    key: "onTimeout",
    value: function onTimeout(xhr, event, request, response) {
      response.request = request;
      response.endTime = Date.now();
      response.timeout = true;
      response.status = 408;
      var prefix = request.retry ? ' attempt ' + (request.retries + 1) : '';
      var error = new RequestTimeout("Request".concat(prefix, " to ").concat(request.url, " has timed out (").concat(response.duration, "ms)."));
      error.request = request;
      error.response = response;
      return error;
    }
  }, {
    key: "onAbort",
    value: function onAbort(xhr, event, request, response) {
      response.request = request;
      response.endTime = Date.now();
      response.aborted = true;
      var error = new RequestAborted("Request to ".concat(request.url, " has been aborted."));
      error.request = request;
      error.response = response;
      return error;
    }
  }, {
    key: "onReadyStateChange",
    value: function onReadyStateChange(xhr, event, request, response) {
      switch (xhr.readyState) {
        case ReadyState.HeadersReceived:
          response.status = xhr.status;
          response.statusText = xhr.statusText;
          HttpClient.SetHeadersFromString(response.headers, xhr.getAllResponseHeaders());
          break;
        // case ReadyState.Done:
      }
    }
  }, {
    key: "onLoadStart",
    value: function onLoadStart(xhr, event, request, response) {// console.log('loadend', event, event.constructor.name);
    }
  }, {
    key: "onLoadEnd",
    value: function onLoadEnd(xhr, event, request, response) {// console.log('loadend', event, event.constructor.name);
    }
  }, {
    key: "onProgress",
    value: function onProgress(xhr, event, request, response) {// console.log('progress', event, event.constructor.name);
    }
  }, {
    key: "isSuccessStatus",
    value: function isSuccessStatus(status) {
      return this.options.isSuccessStatus ? this.options.isSuccessStatus(status) : status >= 200 && status < 400;
    }
  }]);

  return HttpClient;
}();

_defineProperty(HttpClient, "defaultOptions", {
  query: {},
  headers: {},
  timeout: 0,
  withCredentials: false,
  responseType: ResponseType.Undefined
});

export { HttpClient as default };