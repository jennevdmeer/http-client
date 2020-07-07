import RequestOptionsInterface from './RequestOptionsInterface';
import ResponseInterface from './ResponseInterface';

export default interface HttpClientInterface {
    get(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;

    post(url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;

    request(method: string, url: string, options?: RequestOptionsInterface): Promise<ResponseInterface>;
}
