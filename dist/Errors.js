"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpClientError extends Error {
    constructor(message, previous = undefined) {
        super(message);
        this.previous = previous;
    }
}
exports.HttpClientError = HttpClientError;
class HttpError extends HttpClientError {
}
exports.HttpError = HttpError;
class NetworkError extends HttpError {
}
exports.NetworkError = NetworkError;
class RequestError extends HttpError {
}
exports.RequestError = RequestError;
class RequestAborted extends HttpError {
}
exports.RequestAborted = RequestAborted;
/**
 * 400.
 */
class ClientError extends RequestError {
}
exports.ClientError = ClientError;
class BadRequest extends ClientError {
}
exports.BadRequest = BadRequest;
class Unauthorized extends ClientError {
}
exports.Unauthorized = Unauthorized;
class PaymentRequired extends ClientError {
}
exports.PaymentRequired = PaymentRequired;
class Forbidden extends ClientError {
}
exports.Forbidden = Forbidden;
class NotFound extends ClientError {
}
exports.NotFound = NotFound;
class MethodNotAllowed extends ClientError {
}
exports.MethodNotAllowed = MethodNotAllowed;
class NotAcceptable extends ClientError {
}
exports.NotAcceptable = NotAcceptable;
class ProxyAuthenticationRequired extends ClientError {
}
exports.ProxyAuthenticationRequired = ProxyAuthenticationRequired;
class RequestTimeout extends ClientError {
}
exports.RequestTimeout = RequestTimeout;
class Conflict extends ClientError {
}
exports.Conflict = Conflict;
class Gone extends ClientError {
}
exports.Gone = Gone;
class LengthRequired extends ClientError {
}
exports.LengthRequired = LengthRequired;
class PreconditionFailed extends ClientError {
}
exports.PreconditionFailed = PreconditionFailed;
class PayloadTooLarge extends ClientError {
}
exports.PayloadTooLarge = PayloadTooLarge;
class URITooLong extends ClientError {
}
exports.URITooLong = URITooLong;
class UnsupportedMediaType extends ClientError {
}
exports.UnsupportedMediaType = UnsupportedMediaType;
class RangeNotSatisfiable extends ClientError {
}
exports.RangeNotSatisfiable = RangeNotSatisfiable;
class ExpectationFailed extends ClientError {
}
exports.ExpectationFailed = ExpectationFailed;
class ImATeapot extends ClientError {
}
exports.ImATeapot = ImATeapot;
class MisdirectedRequest extends ClientError {
}
exports.MisdirectedRequest = MisdirectedRequest;
class UnprocessableEntity extends ClientError {
}
exports.UnprocessableEntity = UnprocessableEntity;
class Locked extends ClientError {
}
exports.Locked = Locked;
class FailedDependency extends ClientError {
}
exports.FailedDependency = FailedDependency;
class TooEarly extends ClientError {
}
exports.TooEarly = TooEarly;
class UpgradeRequired extends ClientError {
}
exports.UpgradeRequired = UpgradeRequired;
class PreconditionRequired extends ClientError {
}
exports.PreconditionRequired = PreconditionRequired;
class TooManyRequests extends ClientError {
}
exports.TooManyRequests = TooManyRequests;
class RequestHeaderFieldsTooLarge extends ClientError {
}
exports.RequestHeaderFieldsTooLarge = RequestHeaderFieldsTooLarge;
class UnavailableForLegalReasons extends ClientError {
}
exports.UnavailableForLegalReasons = UnavailableForLegalReasons;
/**
 * 500.
 */
class ServerError extends RequestError {
}
exports.ServerError = ServerError;
class InternalServerError extends ServerError {
}
exports.InternalServerError = InternalServerError;
class NotImplemented extends ServerError {
}
exports.NotImplemented = NotImplemented;
class BadGateway extends ServerError {
}
exports.BadGateway = BadGateway;
class ServiceUnavailable extends ServerError {
}
exports.ServiceUnavailable = ServiceUnavailable;
class GatewayTimeout extends ServerError {
}
exports.GatewayTimeout = GatewayTimeout;
class HTTPVersionNotSupported extends ServerError {
}
exports.HTTPVersionNotSupported = HTTPVersionNotSupported;
class VariantAlsoNegotiates extends ServerError {
}
exports.VariantAlsoNegotiates = VariantAlsoNegotiates;
class InsufficientStorage extends ServerError {
}
exports.InsufficientStorage = InsufficientStorage;
class LoopDetected extends ServerError {
}
exports.LoopDetected = LoopDetected;
class NotExtended extends ServerError {
}
exports.NotExtended = NotExtended;
class NetworkAuthenticationRequired extends ServerError {
}
exports.NetworkAuthenticationRequired = NetworkAuthenticationRequired;
exports.StatusToError = {
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
    511: NetworkAuthenticationRequired,
};
//# sourceMappingURL=Errors.js.map