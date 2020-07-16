import RequestOptionsInterface from './RequestOptionsInterface';
import ResponseInterface from './ResponseInterface';
import Request from './Request';
export default interface HttpClientInterface {
    get(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    post(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    request(method: string, url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
    retry(request: Request): Promise<ResponseInterface>;
}
