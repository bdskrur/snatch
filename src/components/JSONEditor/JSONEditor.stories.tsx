import * as React from "react";
import { CSSProperties } from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
// import { action } from "@storybook/addon-actions";
import { JSONEditor } from "./JSONEditor";

const stories = storiesOf("JSONEditor", module);

const defValue = {
    String: "houston",
    Boolean: false,
    Number: 123,
    json: {
        field: "field",
        field2: "field",
    },
};

stories.add(
    "Editor",
    withInfo({ inline: true })(() => (
        <div style={styles.container}>
            <JSONEditor value={defValue} onChange={onChange} />
        </div>
    ))
);

function onChange(value: object) {
    console.log(value);
}

const styles: { [key: string]: CSSProperties } = {
    container: {
        width: 400,
    },
    cellContainer: {
        width: 100,
        height: 100,
        backgroundColor: "rgb(72, 78, 104)",
    },
};
styles.firstCellContainer = { ...styles.cellContainer, marginRight: 20 };
