import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import Headers from './Headers';
export default interface ResponseInterface {
    request: RequestInterface;
    status: number;
    statusText: string;
    headers: Headers;
    responseType?: ResponseType;
    content: string | object | Array<any>;
    aborted: boolean;
    timeout: boolean;
    error: boolean;
    endTime: number;
    readonly duration: number;
}
