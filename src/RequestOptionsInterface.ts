import ResponseType from './ResponseType';
import Headers from './Headers';

import { HttpClientError } from './Errors';

export default interface RequestOptionsInterface {
    /**
     * String or either type(token/bearer)/credentials or username/password indexed object.
     */
    auth?: string | { [key: string]: string },
    baseUrl?: string,

    query?: object,
    data?: string | object,
    json?: any,
    headers?: Headers,

    timeout?: number, // timeout in ms
    responseType?: ResponseType, // response should be parsed as; text, json or arrayBuffer.
    withCredentials?: boolean,

    isSuccessStatus?: (status: number) => boolean;

    retry?: (attempts: number, error: HttpClientError) => number | undefined; // when to retry a request.
};
