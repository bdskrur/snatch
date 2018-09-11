import * as React from "react";
import DatePicker from "retail-ui/components/DatePicker/DatePicker";
import { TimeInput } from "../TimeInput/TimeInput";
import Gapped from "retail-ui/components/Gapped/Gapped";

interface IProps {
    value: string;
    onChange: (value: string) => void;
}

export class DateTimeInput extends React.Component<IProps> {
    public render() {
        const { value } = this.props;
        let date = "";
        let time = "";
        if (value) {
            const splittedDate = value.split(" ");
            if (splittedDate.length === 2) {
                date = splittedDate[0];
                time = splittedDate[1];
            }
        }

        return (
            <Gapped gap={0}>
                <DatePicker value={date} onChange={this.onDateChange} width={110} />
                <TimeInput value={time} onChange={this.onTimeChange} />
            </Gapped>
        );
    }

    private onDateChange = (e: any, value: string) => {
        if (this.props.value) {
            const splittedDate = this.props.value.split(" ");
            this.props.onChange(value + " " + splittedDate[1]);
        }
    };

    private onTimeChange(e: any, value: string) {
        if (this.props.value) {
            const splittedDate = this.props.value.split(" ");
            this.props.onChange(splittedDate[0] + " " + value);
        }
    }
}
