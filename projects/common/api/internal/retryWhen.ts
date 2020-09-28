import { Observable, of, throwError } from 'rxjs';
import { delay, mergeMap, retryWhen } from 'rxjs/operators';

const getErrorMessages = (maxRetry) =>
    `Resource retry limit exceeded (${maxRetry})`;

const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_BACKOFF = 1000;

export function retryWithBackoff(delayMs: number, maxRetry = DEFAULT_MAX_RETRIES, backoffMs = DEFAULT_BACKOFF) {
    let retries = maxRetry;

    return (src: Observable<any>) => src.pipe(
        retryWhen((errors: Observable<any>) => errors.pipe(
            mergeMap(error => {
                console.dir(error);
                if (retries-- > 0) {
                    const backOffTime = delayMs + (maxRetry - retries) * backoffMs;
                    return of(error).pipe(delay(backOffTime));
                } else { return throwError(error); }
            })
        )));
}
