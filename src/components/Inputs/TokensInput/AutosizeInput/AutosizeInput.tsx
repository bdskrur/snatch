import * as React from "react";
import { CSSProperties, FormEvent, KeyboardEvent } from "react";

const sizerStyle: CSSProperties = {
    position: "absolute",
    top: 0,
    left: 0,
    visibility: "hidden",
    height: 0,
    overflow: "scroll",
    whiteSpace: "pre",
};

const INPUT_PROPS_BLACKLIST = ["injectStyles", "inputClassName", "inputRef", "inputStyle", "minWidth", "onAutosize"];

const cleanInputProps = (inputProps: IProps) => {
    INPUT_PROPS_BLACKLIST.forEach(field => delete inputProps[field]);
    return inputProps;
};

const copyStyles = (styles: CSSStyleDeclaration, node: HTMLElement) => {
    node.style.fontSize = styles.fontSize;
    node.style.fontFamily = styles.fontFamily;
    node.style.fontWeight = styles.fontWeight;
    node.style.fontStyle = styles.fontStyle;
    node.style.letterSpacing = styles.letterSpacing;
    node.style.textTransform = styles.textTransform;
};

const generateId = () => {
    return (
        "_" +
        Math.random()
            .toString(36)
            .substr(2, 12)
    );
};

declare type StyleWidth = number | string;

interface IProps {
    className?: string;
    defaultValue?: string;
    id?: string;
    injectStyles?: boolean;
    inputClassName?: string;
    inputStyle?: CSSProperties;
    minWidth?: StyleWidth;
    onAutosize?: (inputWidth: StyleWidth) => void;
    onChange?: (e: FormEvent<HTMLInputElement>) => void;
    onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
    onBlur?: () => void;
    onFocus?: () => void;
    style?: CSSProperties;
    value?: string;
    autoFocus?: boolean;
}

interface IState {
    inputWidth: StyleWidth;
    inputId: string;
}

export class AutosizeInput extends React.Component<IProps, IState> {
    public static defaultProps: Partial<IProps> = {
        minWidth: 1,
        injectStyles: true,
    };

    private mounted: boolean;

    private input: HTMLInputElement | null;

    private sizer: HTMLDivElement | null;

    constructor(props: IProps) {
        super(props);
        this.state = {
            inputWidth: props.minWidth || 0,
            inputId: props.id || generateId(),
        };
    }

    public componentDidMount() {
        this.mounted = true;
        this.copyInputStyles();
        this.updateInputWidth();
    }

    public componentWillReceiveProps(nextProps: IProps) {
        const { id } = nextProps;
        if (id !== this.props.id) {
            this.setState({ inputId: id || generateId() });
        }
    }

    public componentDidUpdate(prevProps: IProps, prevState: IState) {
        if (prevState.inputWidth !== this.state.inputWidth) {
            if (typeof this.props.onAutosize === "function") {
                this.props.onAutosize(this.state.inputWidth);
            }
        }
        this.updateInputWidth();
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    private sizerRef = (el: HTMLDivElement) => {
        this.sizer = el;
    };

    private copyInputStyles() {
        if (!this.mounted || !window.getComputedStyle || !this.sizer) {
            return;
        }

        const inputStyles = this.input && window.getComputedStyle(this.input);
        if (!inputStyles) {
            return;
        }

        copyStyles(inputStyles, this.sizer);
    }

    private updateInputWidth() {
        if (!this.mounted || !this.sizer || typeof this.sizer.scrollWidth === "undefined") {
            return;
        }

        let newInputWidth = this.sizer.scrollWidth + 2;
        if (this.props.minWidth && newInputWidth < this.props.minWidth) {
            newInputWidth = Number(this.props.minWidth);
        }

        if (newInputWidth !== this.state.inputWidth) {
            this.setState({
                inputWidth: newInputWidth,
            });
        }
    }

    public getInput() {
        return this.input;
    }

    public focus() {
        if (this.input) {
            this.input.focus();
        }
    }

    public blur() {
        if (this.input) {
            this.input.blur();
        }
    }

    public select() {
        if (this.input) {
            this.input.select();
        }
    }

    public render() {
        const sizerValue = [this.props.defaultValue, this.props.value, ""].reduce((previousValue, currentValue) => {
            if (previousValue !== null && previousValue !== undefined) {
                return previousValue;
            }
            return currentValue;
        });

        const wrapperStyle: CSSProperties = { ...this.props.style };
        if (!wrapperStyle.display) {
            wrapperStyle.display = "inline-block";
        }

        const inputStyle: CSSProperties = { ...this.props.inputStyle };
        inputStyle.boxSizing = "content-box";
        inputStyle.width = `${this.state.inputWidth}px`;
        const { ...inputProps } = this.props;
        cleanInputProps(inputProps);
        inputProps.className = this.props.inputClassName;
        inputProps.id = this.state.inputId;
        inputProps.style = inputStyle;

        return (
            <div className={this.props.className} style={wrapperStyle}>
                <input {...inputProps} />
                <div ref={this.sizerRef} style={sizerStyle}>
                    {sizerValue}
                </div>
            </div>
        );
    }
}
