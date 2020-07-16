import RequestInterface from './RequestInterface';
import ResponseType from './ResponseType';
import Headers from './Headers';
export default interface ResponseInterface {
    request: RequestInterface;
    status: number;
    statusText: string;
    headers: Headers;
    responseType?: ResponseType;
    data: any;
    successful: boolean;
    error: boolean;
    aborted: boolean;
    timeout: boolean;
    endTime: number;
    readonly duration: number;
}
