import { action, observable } from "mobx";
import { IColumn } from "./IColumn";
import { IColumnGroup } from "./IColumnGroup";
import { SortCondition } from "./SortCondition";
import { SortResult } from "./SortResult";
import { ITableModelConfig } from "./ITableModelConfig";
import { ThenSortResult } from "./ThenSortResult";

export class TableModel<T> {
    public columns: Array<IColumn<T>>;

    public columnsGroup?: Array<IColumnGroup<T>>;

    public onRowClick?: (row: T) => void;

    public onGroupRowClick?: (rows: T[]) => void;

    private currentColumn: IColumn<T>;

    @observable
    private observableCurrentColumn: IColumn<T>;

    constructor(config: ITableModelConfig<T>) {
        this.columnsGroup = config.columnsGroup;
        this.onRowClick = config.onRowClick;
        this.onGroupRowClick = config.onGroupRowClick;
        this.setDefaults(config.columns);
    }

    public onSort = (column: IColumn<T>) => {
        const sortCondition = this.getSortCondition(column.sortCondition);
        this.updateCurrentColumn(column, sortCondition);
    };

    @observable
    public outerSort = this.getOuterSortFn();

    @observable
    public innerSort = this.getInnerSortFn();

    private getOuterSortFn() {
        return (a: T[], b: T[]) => {
            const result = this.conditionalSort(a, b, this.observableCurrentColumn.sorting!.outerSort);

            if (result !== 0) {
                return result;
            }

            return this.conditionalSort(a, b, this.observableCurrentColumn.sorting!.outerThenSort!);
        };
    }

    private getInnerSortFn() {
        return (a: T, b: T) => {
            const result = this.conditionalSort(a, b, this.observableCurrentColumn.sorting!.innerSort!);

            if (result !== 0) {
                return result;
            }

            return this.conditionalSort(a, b, this.observableCurrentColumn.sorting!.innerThenSort!);
        };
    }

    private conditionalSort = (a: T | T[], b: T | T[], fn: (a: T | T[], b: T | T[]) => SortResult | ThenSortResult) => {
        if (!this.observableCurrentColumn.sortCondition || !this.observableCurrentColumn.sorting!.sortCondition) {
            return 0;
        }

        if (this.observableCurrentColumn.sorting!.sortCondition === SortCondition.Asc) {
            return this.observableCurrentColumn.sortCondition === SortCondition.Asc ? fn(a, b) : fn(a, b) * -1;
        } else {
            return this.observableCurrentColumn.sortCondition === SortCondition.Asc ? fn(a, b) * -1 : fn(a, b);
        }
    };

    private updateCurrentColumn = (column: IColumn<T>, condition?: SortCondition) => {
        const newCondition = condition ? condition : column.sortCondition!;

        if (this.currentColumnExists()) {
            if (this.currentColumn === column) {
                this.updateCurrentColumnSortCondition(newCondition);
                return;
            }

            this.resetCurrentColumn();
        }

        this.setCurrentColumn(column, newCondition);
    };

    private currentColumnExists = (): boolean => {
        return this.currentColumn !== undefined;
    };

    @action
    private updateCurrentColumnSortCondition = (newCondition: SortCondition) => {
        this.currentColumn.sortCondition = newCondition;
        this.observableCurrentColumn.sortCondition = newCondition;
        this.outerSort = this.getOuterSortFn();
        this.innerSort = this.getInnerSortFn();
    };

    private resetCurrentColumn = () => {
        this.currentColumn.sortCondition = undefined;
    };

    @action
    private setCurrentColumn = (column: IColumn<T>, newCondition: SortCondition) => {
        column.sortCondition = newCondition;
        this.currentColumn = column;
        this.observableCurrentColumn = this.currentColumn;
        this.outerSort = this.getOuterSortFn();
        this.innerSort = this.getInnerSortFn();
    };

    private setDefaults(columns: Array<IColumn<T>>) {
        this.columns = columns.map(column => {
            // Set default sorting for elements without sorting
            if (typeof column.cellData === "string") {
                if (!column.sorting) {
                    column.sorting = {
                        outerSort: this.defaultOuterSort(column.cellData),
                        innerSort: this.defaultInnerSort(column.cellData),
                    };
                } else if (column.sorting && !column.sorting.innerSort) {
                    column.sorting.innerSort = this.defaultInnerSort(column.cellData);
                }
            }
            // Set established sorting
            if (column.sortCondition && column.sorting) {
                this.updateCurrentColumn(column);
            }
            return column;
        });
    }

    private getSortCondition = (value?: SortCondition): SortCondition => {
        return value === SortCondition.Asc ? SortCondition.Desc : SortCondition.Asc;
    };

    private defaultOuterSort = (field: string) => {
        return (a: T[], b: T[]) => (a[0][field] > b[0][field] ? 1 : a[0][field] === b[0][field] ? 0 : -1);
    };

    private defaultInnerSort = (field: string) => {
        return (a: T, b: T) => (a[field] > b[field] ? 1 : a[field] === b[field] ? 0 : -1);
    };
}
