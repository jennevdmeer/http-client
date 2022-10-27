import ResponseType from './ResponseType';
import Headers from './Headers';

import {
    HttpClientError,
    HttpError,
    NetworkError,
    RequestAborted,
    RequestTimeout,
} from './Errors';
import RequestInterface from './RequestInterface';
import ResponseInterface from './ResponseInterface';

export default interface RequestOptionsInterface {
    /**
     * String or either type(token/bearer)/credentials or username/password indexed object.
     */
    auth?: string | { [key: string]: string };
    baseUrl?: string;

    query?: object;
    body?: string | object;
    json?: any;
    headers?: Headers;

    timeout?: number; // timeout in ms
    responseType?: ResponseType; // response should be parsed as; text, json or arrayBuffer.
    withCredentials?: boolean;
    async?: boolean;

    /** Fired when a request has been aborted, for example because the program called XMLHttpRequest.abort() */
    onAbort?: (event: ProgressEvent, error: RequestAborted, xhr: XMLHttpRequest) => void;
    /** Fired when the request encountered an error. */
    onError?: (event: ProgressEvent, error: NetworkError, xhr: XMLHttpRequest) => void;
    /** Fired when an XMLHttpRequest transaction completes successfully. */
    onLoad?: (event: ProgressEvent, request: RequestInterface, response: ResponseInterface, xhr: XMLHttpRequest) => void;
    /** Fired when an XMLHttpRequest transaction completes successfully but the response status code is not a succes status. */
    onLoadError?: (event: ProgressEvent, error: HttpError, xhr: XMLHttpRequest) => void;
    /** Fired when a request has completed, whether successfully (after load) or unsuccessfully (after abort or error). */
    onLoadEnd?: (event: ProgressEvent, request: RequestInterface, response: ResponseInterface, xhr: XMLHttpRequest) => void;
    /** Fired when a request has started to load data. */
    onLoadStart?: (event: ProgressEvent, request: RequestInterface, response: ResponseInterface, xhr: XMLHttpRequest) => void;
    /** Fired periodically when a request receives more data. */
    onProgress?: (event: ProgressEvent, request: RequestInterface, response: ResponseInterface, xhr: XMLHttpRequest) => void;
    /** Fired whenever the readyState property changes. */
    onReadyStateChange?: (event: Event, request: RequestInterface, response: ResponseInterface, xhr: XMLHttpRequest) => void;
    /** Fired when progress is terminated due to preset time expiring. */
    onTimeout?: (event: ProgressEvent, error: RequestTimeout, xhr: XMLHttpRequest) => void;

    isSuccessStatus?: (status: number) => boolean;

    retry?: (attempts: number, error: HttpClientError) => number | undefined; // when to retry a request.
};
