import { HttpError } from './HttpError';


const RETRYABLE_STATUS_CODES =
    new Set([
        429,
        502,
        503,
        504
    ]);

    export function isRetryableError(
        error : unknown
    ): boolean {
         if (error instanceof HttpError) {

        return RETRYABLE_STATUS_CODES
            .has(error.status);
    }

    if (error instanceof Error) {

        const message =
            error.message.toLowerCase();

        return (
            message.includes('econnreset') ||
            message.includes('etimedout') ||
            message.includes('socket hang up')
        );
    }

    return false;
}
    
export interface RetryOptions{
    maxAttempts : number;
    delayMs : number;
    baseDelayMs: number;
    maxDelayMs?: number;
}
export async function retry<T>(
    operation: () => Promise<T>,
    shouldRetry: (error:unknown) => boolean,
    options: RetryOptions
): Promise<T> {
 
    let lastError: unknown;

    for(
        let attempt = 1;
        attempt <= options.maxAttempts;
        attempt++
    ){
        try{
            return await operation();
        }
        catch(error){
            lastError = error;
            if(!shouldRetry(error)){
                throw error;
            }
            if(attempt === options.maxAttempts){
                throw error;
            }
             await new Promise(resolve =>
                setTimeout(resolve, options.delayMs)
            );
            const exponentialDelay =
                options.baseDelayMs *
                Math.pow(2, attempt - 1);

            const cappedDelay =
                Math.min(
                    exponentialDelay,
                    options.maxDelayMs ?? 5000
                );

            const jitter =
                Math.random() * 250;

            const delay =
                cappedDelay + jitter;

            console.warn(
                `Attempt ${attempt} failed. ` +
                `Retrying in ${Math.round(delay)} ms`
            );

            await new Promise(resolve =>
                setTimeout(resolve, delay)
            );
        }
    }
    throw lastError;
}