import { SortCondition } from "./SortCondition";
import { SortResult } from "./SortResult";
import { ThenSortResult } from "./ThenSortResult";

export interface ISorting<T> {
    outerSort: (a: T[], b: T[]) => SortResult;
    innerSort?: (a: T, b: T) => SortResult;
    outerThenSort?: (a: T[], b: T[]) => ThenSortResult;
    innerThenSort?: (a: T, b: T) => ThenSortResult;
    sortCondition?: SortCondition;
}
