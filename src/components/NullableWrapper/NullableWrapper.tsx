import * as React from "react";

interface IProps {
    renderWhenNull: () => React.ReactNode;
}

export class NullableWrapper extends React.Component<IProps> {
    public render() {
        return this.props.children ? this.props.children : this.props.renderWhenNull();
    }
}
