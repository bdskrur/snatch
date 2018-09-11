import * as React from "react";
import cn from "./UploadInputError.css";
import Icon from "retail-ui/components/Icon/Icon";

interface IProps {
    fileName: string;
    errorText: string;
}

export class UploadInputError extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <div className={cn("fileName")}>{this.props.fileName}</div>
                <div className={cn("errorMessage")}>{this.props.errorText}</div>
                <div className={cn("icon")}>
                    <Icon name="Error" />
                </div>
            </div>
        );
    }
}
