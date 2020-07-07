import HttpClient from 'http-client';
import { NetworkError, RequestTimeout, ServerError } from 'http-client/errors';

const http = new HttpClient({
    timeout: 2500,
    withCredentials: true,
    retry(attempts, error) {
        if (attempts >= 3) {
            return;
        }

        if (error instanceof ServerError || error instanceof NetworkError || error instanceof RequestTimeout) {
            return 1000;
        }
    },
});
