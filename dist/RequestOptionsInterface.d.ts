import ResponseType from './ResponseType';
import Headers from './Headers';
import { HttpClientError } from './Errors';
export default interface RequestOptionsInterface {
    authBasic?: string | string[] | {
        [key: string]: string;
    };
    baseUrl?: string;
    query: object;
    body?: string | object;
    json?: string | object;
    headers: Headers;
    timeout: number;
    responseType?: ResponseType;
    withCredentials: boolean;
    isSuccessStatus?: (status: number) => boolean;
    retry?: (attempts: number, error: HttpClientError) => number | undefined;
}
