import * as React from "react";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../stores";
import { Capitalization } from "../../components/Snatch/Capitalization/Capitalization";
import { PageColumns } from "../../components/ContentWrappers/PageColumns/PageColumns";
import { PeoplesVsPlayers } from "../../components/Snatch/PeoplesVsPlayers/PeoplesVsPlayers";
import { Events } from "../../components/Snatch/Events/Events";

interface IProps {
    rootStore?: RootStore;
}

@inject("rootStore")
@observer
export class MainPage extends React.Component<IProps> {
    public componentWillMount() {
        this.snatchGeneratorStore.addPeopleAction.start();
    }

    public componentWillUnmount() {
        this.snatchGeneratorStore.addPeopleAction.stop();
    }

    public render() {
        return (
            <PageColumns>
                <PageColumns.Row>
                    <PageColumns.Column>
                        <PeoplesVsPlayers />
                    </PageColumns.Column>
                    <PageColumns.Column>
                        <Capitalization />
                    </PageColumns.Column>
                    <PageColumns.Column style={{ width: 300 }}>
                        <RateForm />
                    </PageColumns.Column>
                </PageColumns.Row>
                <PageColumns.Row>
                    <PageColumns.Column style={{ flex: 1 }}>
                        <Events />
                    </PageColumns.Column>
                </PageColumns.Row>
            </PageColumns>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
