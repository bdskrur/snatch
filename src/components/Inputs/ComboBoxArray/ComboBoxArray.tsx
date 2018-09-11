import * as React from "react";
import Gapped from "retail-ui/components/Gapped/Gapped";
import ComboBox from "retail-ui/components/ComboBox/ComboBox";

export interface IProps<T> {
    width: number;
    items: T[];
    selectedItems: T[];
    onChange: (newList: T[]) => void;
    renderItem?: (item: T) => React.ReactNode;
    searchItems?: (query: string, items: T[]) => T[];
    itemToValue?: (item: T) => string | number;
    valueToString?: (item: T) => string;
}

export class ComboBoxArray<T> extends React.Component<IProps<T>> {
    public static defaultProps = {
        renderItem: (item: string) => item,
        searchItems: (q: string, items: string[]) => items.filter(x => x.toLowerCase().includes(q.toLowerCase())),
        itemToValue: (item: string) => item,
        valueToString: (item: string) => item,
    };

    private getItems = (q: string) => {
        const { items, searchItems } = this.props;
        return Promise.resolve(searchItems!(q, items));
    };

    public render() {
        const { items, selectedItems, renderItem, itemToValue, valueToString, width } = this.props;
        return (
            <React.Fragment>
                <Gapped vertical={true}>
                    {selectedItems.map((item, index) => {
                        return (
                            <ComboBox
                                key={index}
                                getItems={this.getItems}
                                width={width}
                                renderValue={renderItem}
                                renderItem={renderItem}
                                itemToValue={itemToValue}
                                valueToString={valueToString}
                                value={item}
                                onChange={this.onChangeExistSelect.bind(this, index)}
                                renderNotFound={this.renderNotFound}
                            />
                        );
                    })}
                    {items.length ? (
                        <ComboBox
                            getItems={this.getItems}
                            width={width}
                            renderValue={renderItem}
                            renderItem={renderItem}
                            itemToValue={itemToValue}
                            valueToString={valueToString}
                            onChange={this.onChangeEmptySelect}
                            renderNotFound={this.renderNotFound}
                        />
                    ) : null}
                </Gapped>
            </React.Fragment>
        );
    }

    private renderNotFound = () => "Not found";

    private onChangeExistSelect = (index: number, event: any, item: T) => {
        const newList = this.props.selectedItems.map((e, i) => {
            return index === i ? item : e;
        });
        this.props.onChange(newList);
    };

    private onChangeEmptySelect = (event: any, item: T) => {
        const items = [...this.props.selectedItems, item];
        this.props.onChange(items);
    };
}
