export class ApiResult {
    constructor(public readonly isSuccessful: boolean, public readonly errorMessage: string) {}

    public static Success(): ApiResult {
        return new ApiResult(true, "");
    }

    public static Error(error: string = "unexpected error"): ApiResult {
        return new ApiResult(false, error);
    }
}
