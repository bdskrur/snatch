import * as React from "react";
import Textarea from "retail-ui/build/components/Textarea/Textarea";
import cn from "./TextareaInput.css";

interface IProps {
    value: string;
    onChange: (_: any, value: string) => void;
    placeholder: string;
}

export class TextareaInput extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <Textarea
                    ref={this.onRef}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    autoResize={true}
                    placeholder={this.props.placeholder}
                    width="100%"
                    rows={6}
                />
            </div>
        );
    }

    public componentDidMount() {
        if (this.textarea) {
            this.textarea.focus();
        }
    }

    private textarea: Textarea | null;

    private onRef = (instance: Textarea | null) => {
        this.textarea = instance;
    };
}
