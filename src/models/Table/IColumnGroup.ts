export interface IColumnGroup<T> {
    columnIdFrom: string;
    columnIdTo: string;
    additionalComponent: (rowData: T) => JSX.Element;
}
