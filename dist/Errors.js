import "core-js/modules/es.symbol";
import "core-js/modules/es.symbol.description";
import "core-js/modules/es.symbol.iterator";
import "core-js/modules/es.array.index-of";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.function.bind";
import "core-js/modules/es.map";
import "core-js/modules/es.object.define-property";
import "core-js/modules/es.object.get-prototype-of";
import "core-js/modules/es.object.set-prototype-of";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.iterator";
import "core-js/modules/web.dom-collections.iterator";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

export var HttpClientError = /*#__PURE__*/function (_Error) {
  _inherits(HttpClientError, _Error);

  var _super = _createSuper(HttpClientError);

  function HttpClientError(message) {
    var _this;

    var previous = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;

    _classCallCheck(this, HttpClientError);

    _this = _super.call(this, message);

    _defineProperty(_assertThisInitialized(_this), "request", void 0);

    _defineProperty(_assertThisInitialized(_this), "response", void 0);

    _defineProperty(_assertThisInitialized(_this), "previous", void 0);

    _this.previous = previous;
    return _this;
  }

  return HttpClientError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
export var HttpError = /*#__PURE__*/function (_HttpClientError) {
  _inherits(HttpError, _HttpClientError);

  var _super2 = _createSuper(HttpError);

  function HttpError() {
    _classCallCheck(this, HttpError);

    return _super2.apply(this, arguments);
  }

  return HttpError;
}(HttpClientError);
export var NetworkError = /*#__PURE__*/function (_HttpError) {
  _inherits(NetworkError, _HttpError);

  var _super3 = _createSuper(NetworkError);

  function NetworkError() {
    _classCallCheck(this, NetworkError);

    return _super3.apply(this, arguments);
  }

  return NetworkError;
}(HttpError);
export var RequestError = /*#__PURE__*/function (_HttpError2) {
  _inherits(RequestError, _HttpError2);

  var _super4 = _createSuper(RequestError);

  function RequestError() {
    _classCallCheck(this, RequestError);

    return _super4.apply(this, arguments);
  }

  return RequestError;
}(HttpError);
export var RequestAborted = /*#__PURE__*/function (_HttpError3) {
  _inherits(RequestAborted, _HttpError3);

  var _super5 = _createSuper(RequestAborted);

  function RequestAborted() {
    _classCallCheck(this, RequestAborted);

    return _super5.apply(this, arguments);
  }

  return RequestAborted;
}(HttpError);
/**
 * 400.
 */

export var ClientError = /*#__PURE__*/function (_RequestError) {
  _inherits(ClientError, _RequestError);

  var _super6 = _createSuper(ClientError);

  function ClientError() {
    _classCallCheck(this, ClientError);

    return _super6.apply(this, arguments);
  }

  return ClientError;
}(RequestError);
export var BadRequest = /*#__PURE__*/function (_ClientError) {
  _inherits(BadRequest, _ClientError);

  var _super7 = _createSuper(BadRequest);

  function BadRequest() {
    _classCallCheck(this, BadRequest);

    return _super7.apply(this, arguments);
  }

  return BadRequest;
}(ClientError);
export var Unauthorized = /*#__PURE__*/function (_ClientError2) {
  _inherits(Unauthorized, _ClientError2);

  var _super8 = _createSuper(Unauthorized);

  function Unauthorized() {
    _classCallCheck(this, Unauthorized);

    return _super8.apply(this, arguments);
  }

  return Unauthorized;
}(ClientError);
export var PaymentRequired = /*#__PURE__*/function (_ClientError3) {
  _inherits(PaymentRequired, _ClientError3);

  var _super9 = _createSuper(PaymentRequired);

  function PaymentRequired() {
    _classCallCheck(this, PaymentRequired);

    return _super9.apply(this, arguments);
  }

  return PaymentRequired;
}(ClientError);
export var Forbidden = /*#__PURE__*/function (_ClientError4) {
  _inherits(Forbidden, _ClientError4);

  var _super10 = _createSuper(Forbidden);

  function Forbidden() {
    _classCallCheck(this, Forbidden);

    return _super10.apply(this, arguments);
  }

  return Forbidden;
}(ClientError);
export var NotFound = /*#__PURE__*/function (_ClientError5) {
  _inherits(NotFound, _ClientError5);

  var _super11 = _createSuper(NotFound);

  function NotFound() {
    _classCallCheck(this, NotFound);

    return _super11.apply(this, arguments);
  }

  return NotFound;
}(ClientError);
export var MethodNotAllowed = /*#__PURE__*/function (_ClientError6) {
  _inherits(MethodNotAllowed, _ClientError6);

  var _super12 = _createSuper(MethodNotAllowed);

  function MethodNotAllowed() {
    _classCallCheck(this, MethodNotAllowed);

    return _super12.apply(this, arguments);
  }

  return MethodNotAllowed;
}(ClientError);
export var NotAcceptable = /*#__PURE__*/function (_ClientError7) {
  _inherits(NotAcceptable, _ClientError7);

  var _super13 = _createSuper(NotAcceptable);

  function NotAcceptable() {
    _classCallCheck(this, NotAcceptable);

    return _super13.apply(this, arguments);
  }

  return NotAcceptable;
}(ClientError);
export var ProxyAuthenticationRequired = /*#__PURE__*/function (_ClientError8) {
  _inherits(ProxyAuthenticationRequired, _ClientError8);

  var _super14 = _createSuper(ProxyAuthenticationRequired);

  function ProxyAuthenticationRequired() {
    _classCallCheck(this, ProxyAuthenticationRequired);

    return _super14.apply(this, arguments);
  }

  return ProxyAuthenticationRequired;
}(ClientError);
export var RequestTimeout = /*#__PURE__*/function (_ClientError9) {
  _inherits(RequestTimeout, _ClientError9);

  var _super15 = _createSuper(RequestTimeout);

  function RequestTimeout() {
    _classCallCheck(this, RequestTimeout);

    return _super15.apply(this, arguments);
  }

  return RequestTimeout;
}(ClientError);
export var Conflict = /*#__PURE__*/function (_ClientError10) {
  _inherits(Conflict, _ClientError10);

  var _super16 = _createSuper(Conflict);

  function Conflict() {
    _classCallCheck(this, Conflict);

    return _super16.apply(this, arguments);
  }

  return Conflict;
}(ClientError);
export var Gone = /*#__PURE__*/function (_ClientError11) {
  _inherits(Gone, _ClientError11);

  var _super17 = _createSuper(Gone);

  function Gone() {
    _classCallCheck(this, Gone);

    return _super17.apply(this, arguments);
  }

  return Gone;
}(ClientError);
export var LengthRequired = /*#__PURE__*/function (_ClientError12) {
  _inherits(LengthRequired, _ClientError12);

  var _super18 = _createSuper(LengthRequired);

  function LengthRequired() {
    _classCallCheck(this, LengthRequired);

    return _super18.apply(this, arguments);
  }

  return LengthRequired;
}(ClientError);
export var PreconditionFailed = /*#__PURE__*/function (_ClientError13) {
  _inherits(PreconditionFailed, _ClientError13);

  var _super19 = _createSuper(PreconditionFailed);

  function PreconditionFailed() {
    _classCallCheck(this, PreconditionFailed);

    return _super19.apply(this, arguments);
  }

  return PreconditionFailed;
}(ClientError);
export var PayloadTooLarge = /*#__PURE__*/function (_ClientError14) {
  _inherits(PayloadTooLarge, _ClientError14);

  var _super20 = _createSuper(PayloadTooLarge);

  function PayloadTooLarge() {
    _classCallCheck(this, PayloadTooLarge);

    return _super20.apply(this, arguments);
  }

  return PayloadTooLarge;
}(ClientError);
export var URITooLong = /*#__PURE__*/function (_ClientError15) {
  _inherits(URITooLong, _ClientError15);

  var _super21 = _createSuper(URITooLong);

  function URITooLong() {
    _classCallCheck(this, URITooLong);

    return _super21.apply(this, arguments);
  }

  return URITooLong;
}(ClientError);
export var UnsupportedMediaType = /*#__PURE__*/function (_ClientError16) {
  _inherits(UnsupportedMediaType, _ClientError16);

  var _super22 = _createSuper(UnsupportedMediaType);

  function UnsupportedMediaType() {
    _classCallCheck(this, UnsupportedMediaType);

    return _super22.apply(this, arguments);
  }

  return UnsupportedMediaType;
}(ClientError);
export var RangeNotSatisfiable = /*#__PURE__*/function (_ClientError17) {
  _inherits(RangeNotSatisfiable, _ClientError17);

  var _super23 = _createSuper(RangeNotSatisfiable);

  function RangeNotSatisfiable() {
    _classCallCheck(this, RangeNotSatisfiable);

    return _super23.apply(this, arguments);
  }

  return RangeNotSatisfiable;
}(ClientError);
export var ExpectationFailed = /*#__PURE__*/function (_ClientError18) {
  _inherits(ExpectationFailed, _ClientError18);

  var _super24 = _createSuper(ExpectationFailed);

  function ExpectationFailed() {
    _classCallCheck(this, ExpectationFailed);

    return _super24.apply(this, arguments);
  }

  return ExpectationFailed;
}(ClientError);
export var ImATeapot = /*#__PURE__*/function (_ClientError19) {
  _inherits(ImATeapot, _ClientError19);

  var _super25 = _createSuper(ImATeapot);

  function ImATeapot() {
    _classCallCheck(this, ImATeapot);

    return _super25.apply(this, arguments);
  }

  return ImATeapot;
}(ClientError);
export var MisdirectedRequest = /*#__PURE__*/function (_ClientError20) {
  _inherits(MisdirectedRequest, _ClientError20);

  var _super26 = _createSuper(MisdirectedRequest);

  function MisdirectedRequest() {
    _classCallCheck(this, MisdirectedRequest);

    return _super26.apply(this, arguments);
  }

  return MisdirectedRequest;
}(ClientError);
export var UnprocessableEntity = /*#__PURE__*/function (_ClientError21) {
  _inherits(UnprocessableEntity, _ClientError21);

  var _super27 = _createSuper(UnprocessableEntity);

  function UnprocessableEntity() {
    _classCallCheck(this, UnprocessableEntity);

    return _super27.apply(this, arguments);
  }

  return UnprocessableEntity;
}(ClientError);
export var Locked = /*#__PURE__*/function (_ClientError22) {
  _inherits(Locked, _ClientError22);

  var _super28 = _createSuper(Locked);

  function Locked() {
    _classCallCheck(this, Locked);

    return _super28.apply(this, arguments);
  }

  return Locked;
}(ClientError);
export var FailedDependency = /*#__PURE__*/function (_ClientError23) {
  _inherits(FailedDependency, _ClientError23);

  var _super29 = _createSuper(FailedDependency);

  function FailedDependency() {
    _classCallCheck(this, FailedDependency);

    return _super29.apply(this, arguments);
  }

  return FailedDependency;
}(ClientError);
export var TooEarly = /*#__PURE__*/function (_ClientError24) {
  _inherits(TooEarly, _ClientError24);

  var _super30 = _createSuper(TooEarly);

  function TooEarly() {
    _classCallCheck(this, TooEarly);

    return _super30.apply(this, arguments);
  }

  return TooEarly;
}(ClientError);
export var UpgradeRequired = /*#__PURE__*/function (_ClientError25) {
  _inherits(UpgradeRequired, _ClientError25);

  var _super31 = _createSuper(UpgradeRequired);

  function UpgradeRequired() {
    _classCallCheck(this, UpgradeRequired);

    return _super31.apply(this, arguments);
  }

  return UpgradeRequired;
}(ClientError);
export var PreconditionRequired = /*#__PURE__*/function (_ClientError26) {
  _inherits(PreconditionRequired, _ClientError26);

  var _super32 = _createSuper(PreconditionRequired);

  function PreconditionRequired() {
    _classCallCheck(this, PreconditionRequired);

    return _super32.apply(this, arguments);
  }

  return PreconditionRequired;
}(ClientError);
export var TooManyRequests = /*#__PURE__*/function (_ClientError27) {
  _inherits(TooManyRequests, _ClientError27);

  var _super33 = _createSuper(TooManyRequests);

  function TooManyRequests() {
    _classCallCheck(this, TooManyRequests);

    return _super33.apply(this, arguments);
  }

  return TooManyRequests;
}(ClientError);
export var RequestHeaderFieldsTooLarge = /*#__PURE__*/function (_ClientError28) {
  _inherits(RequestHeaderFieldsTooLarge, _ClientError28);

  var _super34 = _createSuper(RequestHeaderFieldsTooLarge);

  function RequestHeaderFieldsTooLarge() {
    _classCallCheck(this, RequestHeaderFieldsTooLarge);

    return _super34.apply(this, arguments);
  }

  return RequestHeaderFieldsTooLarge;
}(ClientError);
export var UnavailableForLegalReasons = /*#__PURE__*/function (_ClientError29) {
  _inherits(UnavailableForLegalReasons, _ClientError29);

  var _super35 = _createSuper(UnavailableForLegalReasons);

  function UnavailableForLegalReasons() {
    _classCallCheck(this, UnavailableForLegalReasons);

    return _super35.apply(this, arguments);
  }

  return UnavailableForLegalReasons;
}(ClientError);
/**
 * 500.
 */

export var ServerError = /*#__PURE__*/function (_RequestError2) {
  _inherits(ServerError, _RequestError2);

  var _super36 = _createSuper(ServerError);

  function ServerError() {
    _classCallCheck(this, ServerError);

    return _super36.apply(this, arguments);
  }

  return ServerError;
}(RequestError);
export var InternalServerError = /*#__PURE__*/function (_ServerError) {
  _inherits(InternalServerError, _ServerError);

  var _super37 = _createSuper(InternalServerError);

  function InternalServerError() {
    _classCallCheck(this, InternalServerError);

    return _super37.apply(this, arguments);
  }

  return InternalServerError;
}(ServerError);
export var NotImplemented = /*#__PURE__*/function (_ServerError2) {
  _inherits(NotImplemented, _ServerError2);

  var _super38 = _createSuper(NotImplemented);

  function NotImplemented() {
    _classCallCheck(this, NotImplemented);

    return _super38.apply(this, arguments);
  }

  return NotImplemented;
}(ServerError);
export var BadGateway = /*#__PURE__*/function (_ServerError3) {
  _inherits(BadGateway, _ServerError3);

  var _super39 = _createSuper(BadGateway);

  function BadGateway() {
    _classCallCheck(this, BadGateway);

    return _super39.apply(this, arguments);
  }

  return BadGateway;
}(ServerError);
export var ServiceUnavailable = /*#__PURE__*/function (_ServerError4) {
  _inherits(ServiceUnavailable, _ServerError4);

  var _super40 = _createSuper(ServiceUnavailable);

  function ServiceUnavailable() {
    _classCallCheck(this, ServiceUnavailable);

    return _super40.apply(this, arguments);
  }

  return ServiceUnavailable;
}(ServerError);
export var GatewayTimeout = /*#__PURE__*/function (_ServerError5) {
  _inherits(GatewayTimeout, _ServerError5);

  var _super41 = _createSuper(GatewayTimeout);

  function GatewayTimeout() {
    _classCallCheck(this, GatewayTimeout);

    return _super41.apply(this, arguments);
  }

  return GatewayTimeout;
}(ServerError);
export var HTTPVersionNotSupported = /*#__PURE__*/function (_ServerError6) {
  _inherits(HTTPVersionNotSupported, _ServerError6);

  var _super42 = _createSuper(HTTPVersionNotSupported);

  function HTTPVersionNotSupported() {
    _classCallCheck(this, HTTPVersionNotSupported);

    return _super42.apply(this, arguments);
  }

  return HTTPVersionNotSupported;
}(ServerError);
export var VariantAlsoNegotiates = /*#__PURE__*/function (_ServerError7) {
  _inherits(VariantAlsoNegotiates, _ServerError7);

  var _super43 = _createSuper(VariantAlsoNegotiates);

  function VariantAlsoNegotiates() {
    _classCallCheck(this, VariantAlsoNegotiates);

    return _super43.apply(this, arguments);
  }

  return VariantAlsoNegotiates;
}(ServerError);
export var InsufficientStorage = /*#__PURE__*/function (_ServerError8) {
  _inherits(InsufficientStorage, _ServerError8);

  var _super44 = _createSuper(InsufficientStorage);

  function InsufficientStorage() {
    _classCallCheck(this, InsufficientStorage);

    return _super44.apply(this, arguments);
  }

  return InsufficientStorage;
}(ServerError);
export var LoopDetected = /*#__PURE__*/function (_ServerError9) {
  _inherits(LoopDetected, _ServerError9);

  var _super45 = _createSuper(LoopDetected);

  function LoopDetected() {
    _classCallCheck(this, LoopDetected);

    return _super45.apply(this, arguments);
  }

  return LoopDetected;
}(ServerError);
export var NotExtended = /*#__PURE__*/function (_ServerError10) {
  _inherits(NotExtended, _ServerError10);

  var _super46 = _createSuper(NotExtended);

  function NotExtended() {
    _classCallCheck(this, NotExtended);

    return _super46.apply(this, arguments);
  }

  return NotExtended;
}(ServerError);
export var NetworkAuthenticationRequired = /*#__PURE__*/function (_ServerError11) {
  _inherits(NetworkAuthenticationRequired, _ServerError11);

  var _super47 = _createSuper(NetworkAuthenticationRequired);

  function NetworkAuthenticationRequired() {
    _classCallCheck(this, NetworkAuthenticationRequired);

    return _super47.apply(this, arguments);
  }

  return NetworkAuthenticationRequired;
}(ServerError);
export var StatusToError = {
  400: BadRequest,
  401: Unauthorized,
  402: PaymentRequired,
  403: Forbidden,
  404: NotFound,
  405: MethodNotAllowed,
  406: NotAcceptable,
  407: ProxyAuthenticationRequired,
  408: RequestTimeout,
  409: Conflict,
  410: Gone,
  411: LengthRequired,
  412: PreconditionFailed,
  413: PayloadTooLarge,
  414: URITooLong,
  415: UnsupportedMediaType,
  416: RangeNotSatisfiable,
  417: ExpectationFailed,
  418: ImATeapot,
  421: MisdirectedRequest,
  422: UnprocessableEntity,
  423: Locked,
  424: FailedDependency,
  425: TooEarly,
  426: UpgradeRequired,
  428: PreconditionRequired,
  429: TooManyRequests,
  431: RequestHeaderFieldsTooLarge,
  451: UnavailableForLegalReasons,
  500: InternalServerError,
  501: NotImplemented,
  502: BadGateway,
  503: ServiceUnavailable,
  504: GatewayTimeout,
  505: HTTPVersionNotSupported,
  506: VariantAlsoNegotiates,
  507: InsufficientStorage,
  508: LoopDetected,
  510: NotExtended,
  511: NetworkAuthenticationRequired
};