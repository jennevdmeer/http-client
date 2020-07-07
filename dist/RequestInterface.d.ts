import RequestOptionsInterface from './RequestOptionsInterface';
export default interface RequestInterface extends RequestOptionsInterface {
    method: string;
    url: string;
    request: XMLHttpRequest;
    startTime: number;
    retries: number;
    abort(): any;
}
