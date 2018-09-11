import * as React from "react";
import { FormEvent, Fragment, KeyboardEvent } from "react";
import cn from "./TokensInput.css";
import { Token } from "./Token/Token";
import { AutosizeInput } from "./AutosizeInput/AutosizeInput";

export interface IToken {
    id: string;
    text: string;
    selected?: boolean;
}

interface IProps {
    defaultTokens?: IToken[];
    onChange: (tokens: IToken[]) => void;
}

interface IState {
    isFocused: boolean;
    tokens: IToken[];
    inputValue: string;
    inputPosition: number;
    inputAutoFocus: boolean;
}

export class TokensInput extends React.Component<IProps, IState> {
    public static defaultProps = {
        defaultTokens: [],
    };

    public state: IState = {
        isFocused: false,
        tokens: [],
        inputValue: "",
        inputPosition: -1,
        inputAutoFocus: false,
    };

    public componentDidMount() {
        const { defaultTokens } = this.props;
        if (defaultTokens) {
            this.setState({
                tokens: defaultTokens.map(x => ({ ...x, selected: false })),
            });
        }
    }

    public render() {
        const { tokens, inputValue, inputPosition, inputAutoFocus } = this.state;
        const labelClassNames = cn({
            wrapper: true,
            wrapperFocused: this.state.isFocused,
        });

        const input = (
            <span className={cn("inputWrapper")}>
                <AutosizeInput
                    value={inputValue}
                    inputClassName={cn("input")}
                    autoFocus={inputAutoFocus}
                    onChange={this.onInputChange}
                    onKeyDown={this.onKeyDown}
                    onBlur={this.onInputBlur}
                    onFocus={this.onInputFocus}
                />
            </span>
        );

        return (
            <label className={labelClassNames}>
                {tokens!.map((token, index) => {
                    return (
                        <Fragment key={index}>
                            {inputPosition === index && input}
                            <Token
                                key={index}
                                id={index}
                                text={token.text}
                                selected={token.selected}
                                onDeleteBtnClick={this.onTokenDeleteBtnClick}
                            />
                        </Fragment>
                    );
                })}
                {inputPosition === -1 && input}
            </label>
        );
    }

    private onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        const { inputValue, tokens } = this.state;
        if (e.key === "Enter") {
            this.onEnter();
        } else if (e.key === "Backspace" && !inputValue && tokens.length) {
            this.onBackspace();
        } else if (e.key === "ArrowLeft" && !inputValue && tokens.length) {
            this.onArrowLeft();
        } else if (e.key === "ArrowRight" && !inputValue && tokens.length) {
            this.onArrowRight();
        }
    };

    public addToken(token: IToken) {
        const { inputPosition, tokens } = this.state;
        if (token.id && token.text) {
            const newTokens = [...tokens];
            newTokens.splice(inputPosition === -1 ? tokens.length : inputPosition, 0, token);
            this.setState(
                {
                    tokens: newTokens,
                    inputPosition: inputPosition === -1 ? inputPosition : inputPosition + 1,
                    inputAutoFocus: true,
                },
                this.onTokensChange
            );
        }
    }

    private onInputFocus = () => {
        this.setState({ isFocused: true });
    };

    private onInputBlur = () => {
        this.setState({ isFocused: false, inputAutoFocus: false });
    };

    private onInputChange = (e: FormEvent<HTMLInputElement>) => {
        this.setState({ inputValue: e.currentTarget.value });
    };

    private onTokenDeleteBtnClick = (token: Token) => {
        const newTokens = [...this.state.tokens];
        newTokens.splice(token.getId(), 1);
        this.setState(
            {
                tokens: newTokens,
            },
            this.onTokensChange
        );
    };

    private onTokensChange = () => {
        const { tokens } = this.state;
        const { onChange } = this.props;
        if (onChange && tokens) {
            onChange(tokens.map(x => ({ ...x })));
        }
    };

    private onEnter() {
        const { inputValue } = this.state;
        this.addToken({ id: inputValue, text: inputValue, selected: false });
        this.setState({ inputValue: "" });
    }

    private onArrowLeft() {
        const { inputPosition, tokens } = this.state;
        this.setState({
            inputPosition: inputPosition === -1 ? tokens.length - 1 : inputPosition - 1,
            inputAutoFocus: true,
        });
    }

    private onArrowRight() {
        const { inputPosition, tokens } = this.state;
        this.setState({
            inputPosition: inputPosition === -1 ? 0 : inputPosition === tokens.length - 1 ? -1 : inputPosition + 1,
            inputAutoFocus: true,
        });
    }

    private onBackspace() {
        const { inputPosition, tokens } = this.state;
        const index = inputPosition === -1 ? tokens.length - 1 : inputPosition - 1;

        if (index === -1) {
            return;
        }

        if (tokens[index].selected) {
            const newTokens = [...tokens];
            newTokens.splice(index, 1);
            this.setState({
                tokens: newTokens,
                inputPosition: inputPosition === -1 ? inputPosition : inputPosition - 1,
            });
        } else {
            const token = tokens[index];
            this.setState({
                tokens: [
                    ...tokens.slice(0, index),
                    {
                        ...token,
                        selected: true,
                    },
                    ...tokens.slice(index + 1),
                ],
            });
        }
    }
}
