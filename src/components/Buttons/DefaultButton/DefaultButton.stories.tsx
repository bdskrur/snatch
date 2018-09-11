import * as React from "react";
import { CSSProperties } from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { action } from "@storybook/addon-actions";
import { DefaultButton } from "./DefaultButton";

const stories = storiesOf("Buttons", module);

stories.add(
    "TicTacToeCell",
    withInfo({ inline: true })(() => (
        <div style={styles.container}>
            <DefaultButton onClick={action("onClick")}>Button</DefaultButton>
        </div>
    ))
);

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: "flex",
    },
    cellContainer: {
        width: 100,
        height: 100,
        backgroundColor: "rgb(72, 78, 104)",
    },
};
styles.firstCellContainer = { ...styles.cellContainer, marginRight: 20 };
