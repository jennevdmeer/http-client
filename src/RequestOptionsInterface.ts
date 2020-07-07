import ResponseType from './ResponseType';
import Headers from './Headers';
import { HttpClientError } from './Errors';

export default interface RequestOptionsInterface {
    authBasic?: string | string[] | { [key: string]: string },
    baseUrl?: string,

    query: object,
    body?: string | object, // defaults to x-www-form-urlencoded if no content type is set.
    json?: string | object, // application/json
    headers: Headers,

    timeout: number, // timeout in ms
    responseType?: ResponseType, // response should be parsed as; text, json or arrayBuffer.
    withCredentials: boolean,

    isSuccessStatus?: (status: number) => boolean;

    retry?: (attempts: number, error: HttpClientError) => number | undefined; // when to retry a request.
};
