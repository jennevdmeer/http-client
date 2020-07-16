import HttpClient from './HttpClient';
import ResponseInterface from './ResponseInterface';
import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import Headers from './Headers';

export default class Response implements ResponseInterface {
    request: RequestInterface;

    status: number;
    statusText: string;

    responseType?: ResponseType;
    data: any;

    successful: boolean = false;
    aborted: boolean = false;
    timeout: boolean = false;
    error: boolean = false;
    endTime: number;

    private _headers: Headers = {};

    set headers(headers: Headers) {
        HttpClient.SetHeaders(this._headers, headers);
    }

    get headers(): Headers {
        return this._headers;
    }

    get duration(): number {
        return this.endTime - this.request.startTime;
    }
}
