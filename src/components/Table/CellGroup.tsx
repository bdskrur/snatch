import * as React from "react";
import { CSSProperties } from "react";
import { IColumn } from "../../models";

interface IProps<T> {
    columns: Array<IColumn<T>>;
    styleFn: any;
}

export class CellGroup<T> extends React.Component<IProps<T>> {
    public render() {
        const { children } = this.props;
        const cssProps = this.getStyles();
        return (
            <div style={{ ...cssProps }} className={this.props.styleFn("cellGroup")}>
                {children}
            </div>
        );
    }

    private getStyles() {
        const { columns } = this.props;
        const cssProps: CSSProperties = {
            flex: columns.length,
        };
        let flex: number = 0;
        let width: number = 0;
        columns.forEach(column => {
            const style = column.cellStyles;
            if (style && style.flex && typeof style.flex === "number") {
                flex += style.flex;
            }

            if (style && style.width && typeof style.width === "number") {
                width += style.width;
            }
        });

        if (flex && width) {
            console.warn('Cells in group must have only "flex" or only "width" property');
        } else if (flex && !width) {
            cssProps.flex = flex;
        } else if (width && !flex) {
            cssProps.flex = undefined;
            cssProps.width = width;
        }

        return cssProps;
    }
}
