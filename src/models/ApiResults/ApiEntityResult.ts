export class ApiEntityResult<T> {
    constructor(
        public readonly isSuccessful: boolean,
        public readonly errorMessage: string,
        public readonly response?: T
    ) {}

    public static Success<T>(response: T): ApiEntityResult<T> {
        return new ApiEntityResult<T>(true, "", response);
    }

    public static Error<T>(error: string = "unexpected error"): ApiEntityResult<T> {
        return new ApiEntityResult<T>(false, error, undefined);
    }
}
