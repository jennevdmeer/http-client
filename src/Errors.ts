import RequestInterface from './RequestInterface';
import ResponseInterface from './ResponseInterface';

export class HttpClientError extends Error {
    public request?: RequestInterface;
    public response?: ResponseInterface;

    public previous: Error;

    constructor(message: string, previous: Error = undefined) {
        super(message);

        this.previous = previous;
    }
}

export class HttpError extends HttpClientError {}
export class NetworkError extends HttpError {}
export class RequestError extends HttpError {}
export class RequestAborted extends HttpError {}

/**
 * 400.
 */
export class ClientError extends RequestError {}
export class BadRequest extends ClientError {}
export class Unauthorized extends ClientError {}
export class PaymentRequired extends ClientError {}
export class Forbidden extends ClientError {}
export class NotFound extends ClientError {}
export class MethodNotAllowed extends ClientError {}
export class NotAcceptable extends ClientError {}
export class ProxyAuthenticationRequired extends ClientError {}
export class RequestTimeout extends ClientError {}
export class Conflict extends ClientError {}
export class Gone extends ClientError {}
export class LengthRequired extends ClientError {}
export class PreconditionFailed extends ClientError {}
export class PayloadTooLarge extends ClientError {}
export class URITooLong extends ClientError {}
export class UnsupportedMediaType extends ClientError {}
export class RangeNotSatisfiable extends ClientError {}
export class ExpectationFailed extends ClientError {}
export class ImATeapot extends ClientError {}
export class MisdirectedRequest extends ClientError {}
export class UnprocessableEntity extends ClientError {}
export class Locked extends ClientError {}
export class FailedDependency extends ClientError {}
export class TooEarly extends ClientError {}
export class UpgradeRequired extends ClientError {}
export class PreconditionRequired extends ClientError {}
export class TooManyRequests extends ClientError {}
export class RequestHeaderFieldsTooLarge extends ClientError {}
export class UnavailableForLegalReasons extends ClientError {}

/**
 * 500.
 */
export class ServerError extends RequestError {}
export class InternalServerError extends ServerError {}
export class NotImplemented extends ServerError {}
export class BadGateway extends ServerError {}
export class ServiceUnavailable extends ServerError {}
export class GatewayTimeout extends ServerError {}
export class HTTPVersionNotSupported extends ServerError {}
export class VariantAlsoNegotiates extends ServerError {}
export class InsufficientStorage extends ServerError {}
export class LoopDetected extends ServerError {}
export class NotExtended extends ServerError {}
export class NetworkAuthenticationRequired extends ServerError {}

export const StatusToError = {
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
