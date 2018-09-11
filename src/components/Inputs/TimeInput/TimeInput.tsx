import * as React from "react";
import Input from "retail-ui/components/Input/Input";
import { InputProps } from "retail-ui/components/Input/Input";

export class TimeInput extends React.Component<InputProps> {
    public render() {
        return <Input width={75} mask="99:99:99" {...this.props} />;
    }
}
