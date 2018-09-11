import * as React from "react";
import cn from "./UploadInput.css";
import * as ReactDOM from "react-dom";
import { observer } from "mobx-react";
import { action, observable } from "mobx";
import { ApiEntityResult } from "../../../models/ApiResults/ApiEntityResult";
import { UploadInputError } from "./UploadInputError/UploadInputError";

interface IProps<T> {
    uploadMethod: (file: File, onProgress?: (ev: ProgressEvent) => void) => Promise<ApiEntityResult<T>>;
    onSuccess?: (response: T | undefined) => void;
}

@observer
export class UploadInput<T> extends React.Component<IProps<T>> {
    public componentDidMount() {
        const dropArea = ReactDOM.findDOMNode(this) as HTMLLabelElement;

        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, this.stopAllPropagation, false);
        });
        ["dragenter", "dragover"].forEach(eventName => {
            dropArea.addEventListener(eventName, this.setHighlight, false);
        });
        ["dragleave", "drop"].forEach(eventName => {
            dropArea.addEventListener(eventName, this.removeHighlight, false);
        });
        dropArea.addEventListener("drop", this.handleDrop, false);
    }

    public componentWillUnmount() {
        const dropArea = ReactDOM.findDOMNode(this) as HTMLLabelElement;

        ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
            dropArea.removeEventListener(eventName, this.stopAllPropagation, false);
        });
        ["dragenter", "dragover"].forEach(eventName => {
            dropArea.removeEventListener(eventName, this.setHighlight, false);
        });
        ["dragleave", "drop"].forEach(eventName => {
            dropArea.removeEventListener(eventName, this.removeHighlight, false);
        });
        dropArea.removeEventListener("drop", this.handleDrop, false);
    }

    public render() {
        const labelStyle = cn({
            wrap: true,
            wrapHighlight: this.highlight,
            wrapProgress: this.isUploading,
        });

        return (
            <div>
                <label className={labelStyle} form="fileElem">
                    {this.renderLabel()}
                    {this.renderProgressBar()}
                    {!this.isUploading && <input type="file" id="fileElem" onChange={this.onChangeFileInput} />}
                </label>
                {this.error && <UploadInputError fileName={this.uploadedFileName} errorText={this.error} />}
            </div>
        );
    }

    private renderProgressBar() {
        return this.isUploading ? <div className={cn("progress")} style={{ width: `${this.progress}%` }} /> : null;
    }

    private renderLabel() {
        return this.isUploading ? (
            <div className={cn("label")}>
                <div className={cn("filename")}>{this.uploadedFileName}</div>
                {this.processing ? <div>Processing...</div> : <div>{this.progress}% Uploaded</div>}
            </div>
        ) : (
            <div className={cn("label")}>
                <span>Click or Drag File Here</span>
            </div>
        );
    }

    @observable
    private highlight: boolean = false;
    @observable
    private isUploading: boolean = false;
    @observable
    private progress: number = 0;
    @observable
    private uploadedFileName: string;
    @observable
    private processing: boolean = false;
    @observable
    private error: string = "";

    @action
    private setInitialState() {
        this.isUploading = false;
        this.processing = false;
    }

    @action
    private initializeProgress() {
        this.uploadedFileName = "";
        this.error = "";
        this.progress = 0;
    }

    @action
    private updateProgress = (ev: ProgressEvent) => {
        this.progress = Math.round((ev.loaded / ev.total) * 100);
        if (this.progress === 100) {
            this.processing = true;
        }
    };

    @action
    private setHighlight = () => {
        this.highlight = true;
    };

    @action
    private removeHighlight = () => {
        this.highlight = false;
    };

    private handleDrop = (e: DragEvent) => {
        const dt = e.dataTransfer;
        const files = dt.files;

        this.handleFiles(files);
    };

    private onChangeFileInput = (e: any) => {
        this.handleFiles(e.target.files);
    };

    @action
    private handleFiles = async (files: FileList) => {
        if (this.isUploading) {
            return;
        }

        this.initializeProgress();
        this.uploadedFileName = files[0].name;
        this.isUploading = true;

        const requestResult = await this.props.uploadMethod(files[0], this.updateProgress);

        if (requestResult.isSuccessful) {
            this.props.onSuccess!(requestResult.response);
        } else {
            this.setError(requestResult.errorMessage);
        }
        this.setInitialState();
    };

    @action
    private setError = (message: string) => {
        this.error = message;
    };

    private stopAllPropagation = (e: DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    };
}
