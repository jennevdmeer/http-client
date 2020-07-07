import RequestInterface from './RequestInterface';
import ResponseInterface from './ResponseInterface';
export declare class HttpClientError extends Error {
    request?: RequestInterface;
    response?: ResponseInterface;
    previous: Error;
    constructor(message: string, previous?: Error);
}
export declare class HttpError extends HttpClientError {
}
export declare class NetworkError extends HttpError {
}
export declare class RequestError extends HttpError {
}
export declare class RequestAborted extends HttpError {
}
/**
 * 400.
 */
export declare class ClientError extends RequestError {
}
export declare class BadRequest extends ClientError {
}
export declare class Unauthorized extends ClientError {
}
export declare class PaymentRequired extends ClientError {
}
export declare class Forbidden extends ClientError {
}
export declare class NotFound extends ClientError {
}
export declare class MethodNotAllowed extends ClientError {
}
export declare class NotAcceptable extends ClientError {
}
export declare class ProxyAuthenticationRequired extends ClientError {
}
export declare class RequestTimeout extends ClientError {
}
export declare class Conflict extends ClientError {
}
export declare class Gone extends ClientError {
}
export declare class LengthRequired extends ClientError {
}
export declare class PreconditionFailed extends ClientError {
}
export declare class PayloadTooLarge extends ClientError {
}
export declare class URITooLong extends ClientError {
}
export declare class UnsupportedMediaType extends ClientError {
}
export declare class RangeNotSatisfiable extends ClientError {
}
export declare class ExpectationFailed extends ClientError {
}
export declare class ImATeapot extends ClientError {
}
export declare class MisdirectedRequest extends ClientError {
}
export declare class UnprocessableEntity extends ClientError {
}
export declare class Locked extends ClientError {
}
export declare class FailedDependency extends ClientError {
}
export declare class TooEarly extends ClientError {
}
export declare class UpgradeRequired extends ClientError {
}
export declare class PreconditionRequired extends ClientError {
}
export declare class TooManyRequests extends ClientError {
}
export declare class RequestHeaderFieldsTooLarge extends ClientError {
}
export declare class UnavailableForLegalReasons extends ClientError {
}
/**
 * 500.
 */
export declare class ServerError extends RequestError {
}
export declare class InternalServerError extends ServerError {
}
export declare class NotImplemented extends ServerError {
}
export declare class BadGateway extends ServerError {
}
export declare class ServiceUnavailable extends ServerError {
}
export declare class GatewayTimeout extends ServerError {
}
export declare class HTTPVersionNotSupported extends ServerError {
}
export declare class VariantAlsoNegotiates extends ServerError {
}
export declare class InsufficientStorage extends ServerError {
}
export declare class LoopDetected extends ServerError {
}
export declare class NotExtended extends ServerError {
}
export declare class NetworkAuthenticationRequired extends ServerError {
}
export declare const StatusToError: {
    400: typeof BadRequest;
    401: typeof Unauthorized;
    402: typeof PaymentRequired;
    403: typeof Forbidden;
    404: typeof NotFound;
    405: typeof MethodNotAllowed;
    406: typeof NotAcceptable;
    407: typeof ProxyAuthenticationRequired;
    408: typeof RequestTimeout;
    409: typeof Conflict;
    410: typeof Gone;
    411: typeof LengthRequired;
    412: typeof PreconditionFailed;
    413: typeof PayloadTooLarge;
    414: typeof URITooLong;
    415: typeof UnsupportedMediaType;
    416: typeof RangeNotSatisfiable;
    417: typeof ExpectationFailed;
    418: typeof ImATeapot;
    421: typeof MisdirectedRequest;
    422: typeof UnprocessableEntity;
    423: typeof Locked;
    424: typeof FailedDependency;
    425: typeof TooEarly;
    426: typeof UpgradeRequired;
    428: typeof PreconditionRequired;
    429: typeof TooManyRequests;
    431: typeof RequestHeaderFieldsTooLarge;
    451: typeof UnavailableForLegalReasons;
    500: typeof InternalServerError;
    501: typeof NotImplemented;
    502: typeof BadGateway;
    503: typeof ServiceUnavailable;
    504: typeof GatewayTimeout;
    505: typeof HTTPVersionNotSupported;
    506: typeof VariantAlsoNegotiates;
    507: typeof InsufficientStorage;
    508: typeof LoopDetected;
    510: typeof NotExtended;
    511: typeof NetworkAuthenticationRequired;
};
