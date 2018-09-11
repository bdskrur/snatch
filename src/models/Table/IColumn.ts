import { ISorting } from "./ISorting";
import { CSSProperties } from "react";
import { SortCondition } from "./SortCondition";

export interface IColumn<T> {
    headerName: string;
    cellData:
        | ((
              rowData: T,
              setCollapsed?: () => void,
              rowHover?: boolean,
              setRowHover?: () => void,
              removeRowHover?: () => void
          ) => JSX.Element)
        | string;
    headerStyles?: CSSProperties;
    id?: string;
    cellStyles?: CSSProperties;
    groupCellData?: (
        rowGroupData: T[],
        setCollapsed?: () => void,
        rowHover?: boolean,
        setRowHover?: () => void,
        removeRowHover?: () => void
    ) => JSX.Element;
    sorting?: ISorting<T>;
    sortCondition?: SortCondition;
    renderData?: ((rowHover?: boolean, setRowHover?: () => void, removeRowHover?: () => void) => JSX.Element) | string;
}
