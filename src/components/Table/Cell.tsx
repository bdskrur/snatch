import * as React from "react";
import { CSSProperties } from "react";
import { IColumn } from "../../models";

interface IProps<T> {
    column: IColumn<T>;
    styleFn: any;
    onClick?: () => void;
    marginRight_15?: boolean;
}

export class Cell<T> extends React.Component<IProps<T>> {
    public render() {
        const { children } = this.props;
        const cssProps = this.getStyles();
        const cellStyles = this.props.styleFn({
            cell: true,
            cellMarginRight15px: this.props.marginRight_15,
        });
        return (
            <div style={{ ...cssProps }} className={cellStyles} onClick={this.onClick}>
                <div className={this.props.styleFn("cellWrapper")}>{children}</div>
            </div>
        );
    }

    private getStyles() {
        const { column } = this.props;
        const { cellStyles } = column;
        const cssProps: CSSProperties = cellStyles ? cellStyles : { flex: 1 };
        if (cellStyles && cellStyles.width) {
            cssProps.flex = undefined;
            cssProps.width = cellStyles.width;
        } else if (cellStyles && cellStyles.flex) {
            cssProps.flex = cellStyles.flex;
        }

        return cssProps;
    }

    private onClick = () => {
        if (this.props.onClick) {
            this.props.onClick();
        }
    };
}
