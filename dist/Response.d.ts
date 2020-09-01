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
    successful: boolean;
    aborted: boolean;
    timeout: boolean;
    error: boolean;
    endTime: number;
    private _headers;
    set headers(headers: Headers);
    get headers(): Headers;
    get duration(): number;
}
