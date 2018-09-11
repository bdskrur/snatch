import * as React from "react";
import cn from "./RangeSlider.css";
import Gapped from "retail-ui/components/Gapped/Gapped";

export interface IProps {
    width: number;
    max: number;
    min: number;
    step: number;
    onChange: (val: number) => void;
    unit: string;
    value: number;
}

export class RangeSlider extends React.Component<IProps> {
    private oneSliderSegment = () => {
        const thumbOffset = 5.5;
        return (this.props.width - 1.5 - thumbOffset) / (this.props.max / this.props.min);
    };

    private moveSlider = () => {
        const move = this.oneSliderSegment() * ((this.props.value - this.props.min) / this.props.min);
        const thumbOffset = 5.5;
        if (move >= this.props.width - 1.5 - thumbOffset - this.oneSliderSegment()) {
            return this.oneSliderSegment() * ((this.props.max - this.props.min) / this.props.min) + "px";
        }
        if (move < 0) {
            return "0px";
        }
        return move + "px";
    };

    private onInputChange = (e: any) => {
        const val = e.target.value;
        this.props.onChange(val);
    };

    private onInputBlur = (e: any) => {
        let val = e.target.value;
        if (val > this.props.max) {
            val = this.props.max;
        }
        if (val < this.props.min) {
            val = this.props.min;
        }
        this.props.onChange(val);
    };

    private onSliderChange = (e: any) => {
        const val = e.target.value;
        this.props.onChange(val);
    };

    public render() {
        const { width, value, min, max, step, unit } = this.props;

        return (
            <div style={{ marginBottom: 20 }}>
                <Gapped gap={6} verticalAlign={"middle"}>
                    <div className={cn("inputTextWrap")}>
                        <input
                            value={value}
                            onBlur={this.onInputBlur}
                            onChange={this.onInputChange}
                            maxLength={4}
                            className={cn("inputText")}
                        />
                        <span className={cn("unit")}>{unit}</span>
                    </div>
                    <div>
                        <div className={cn("sliderWrap")}>
                            <div style={{ width }} className={cn("sliderRange")}>
                                <div style={{ width: this.moveSlider() }} className={cn("sliderFill")} />
                                <div style={{ left: this.moveSlider() }} className={cn("sliderThumb")} />
                            </div>
                            <div className={cn("rangeWrap")}>
                                <input
                                    onChange={this.onSliderChange}
                                    style={{ width }}
                                    value={value}
                                    min={min}
                                    max={max}
                                    step={step}
                                    className={cn("inputRange")}
                                    type="range"
                                />
                            </div>
                        </div>
                    </div>
                </Gapped>
            </div>
        );
    }
}
