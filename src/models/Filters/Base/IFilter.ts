export interface IFilter<T> {
    match: (value: T) => boolean;
}
