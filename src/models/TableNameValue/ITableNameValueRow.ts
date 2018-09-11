export interface ITableNameValueRow<T> {
    title: string;
    view: (data: T) => JSX.Element | string;
}
