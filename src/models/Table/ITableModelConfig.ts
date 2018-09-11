import { IColumn } from "./IColumn";
import { IColumnGroup } from "./IColumnGroup";

export interface ITableModelConfig<T> {
    columns: Array<IColumn<T>>;
    columnsGroup?: Array<IColumnGroup<T>>;
    onRowClick?: (row: T) => void;
    onGroupRowClick?: (rows: T[]) => void;
}
