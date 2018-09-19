import * as React from "react";
import { PageWithWorkspace } from "../../components/ContentWrappers/PageWithWorkspace/PageWithWorkspace";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../stores";
import { SvgPieChart } from "../../components/SvgPieChart/SvgPieChart";

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
            <PageWithWorkspace>
                <PageWithWorkspace.Body>
                    <SvgPieChart data={this.snatchGeneratorStore.playersPie} />
                </PageWithWorkspace.Body>
                <PageWithWorkspace.Bar>
                    <RateForm />
                </PageWithWorkspace.Bar>
            </PageWithWorkspace>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
