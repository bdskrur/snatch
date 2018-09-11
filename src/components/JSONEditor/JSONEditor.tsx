import * as React from "react";
import AceEditor, { Annotation } from "react-ace";
import cn from "./JSONEditor.css";
import "brace/mode/json";
import "brace/theme/houston";

interface IProps {
    value?: object;
    onChange: (value: object) => void;
    onValidate?: (annotations: Annotation[]) => void;
    height?: number;
}

// Todo компонент нужно рефакторить

const DEFAULT_HEIGHT_EMPTY_AUTO_RESIZE_EDITOR = "100px";

export class JSONEditor extends React.Component<IProps> {
    public render() {
        return (
            <div className={cn("wrap")}>
                <AceEditor
                    editorProps={{ $blockScrolling: Infinity }}
                    onLoad={this.onLoad}
                    mode="json"
                    theme="houston"
                    onChange={this.onChange}
                    width="100%"
                    showPrintMargin={true}
                    setOptions={{
                        tabSize: 2,
                    }}
                    onValidate={this.onEditorValidate}
                />
            </div>
        );
    }

    private oldHeight: number;
    private editor: any;

    private onLoad = (editor: any) => {
        this.editor = editor;
        if (this.props.height) {
            editor.container.style.height = `${this.props.height}px`;
            this.setValue();
            return;
        }
        editor.on("change", (arg: any, activeEditor: any) => {
            const aceEditor = activeEditor;
            const numberOfLines = aceEditor.getSession().getScreenLength();
            const linesHeight = 17;
            const newHeight = numberOfLines * linesHeight + 10;
            if (!this.oldHeight) {
                this.oldHeight = newHeight;
            }
            if (this.oldHeight > newHeight) {
                aceEditor.container.style.height = `${this.oldHeight}px`;
            } else {
                aceEditor.container.style.height = `${newHeight}px`;
                this.oldHeight = newHeight;
            }
            if (this.oldHeight < 100) {
                aceEditor.container.style.height = DEFAULT_HEIGHT_EMPTY_AUTO_RESIZE_EDITOR;
            }
            aceEditor.resize();
        });
        this.setValue();
    };

    public shouldComponentUpdate() {
        return false;
    }

    private setValue = () => {
        try {
            const jsonSting = JSON.stringify(this.props.value, null, "\t");
            this.editor.setValue(jsonSting);
            this.editor.clearSelection();
        } catch (e) {
            this.editor.setValue("");
            this.editor.container.style.height = DEFAULT_HEIGHT_EMPTY_AUTO_RESIZE_EDITOR;
        }
    };

    private onChange = (value: string) => {
        try {
            this.props.onChange(JSON.parse(value));
        } catch (e) {
            // invalid JSON
        }
    };

    private onEditorValidate = (annotations: Annotation[]) => {
        if (this.props.onValidate) {
            this.props.onValidate(annotations);
        }
    };
}
