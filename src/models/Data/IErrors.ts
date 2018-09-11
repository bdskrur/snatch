export interface IErrors {
    totalErrors: number;
    errors: IError[];
}

export interface IError {
    date: string;
    messages: string[];
}
