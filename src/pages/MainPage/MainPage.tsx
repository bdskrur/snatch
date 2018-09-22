import * as React from "react";
import { PageWithWorkspace } from "../../components/ContentWrappers/PageWithWorkspace/PageWithWorkspace";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../stores";
import { SvgPieChart } from "../../components/SvgPieChart/SvgPieChart";
import { NumberTitle } from "../../components/NumberTitle/NumberTitle";
import { Gapped } from "retail-ui/components";

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
                    <PageWithWorkspace.Column>
                        <Gapped vertical={true} gap={15}>
                            <NumberTitle value={this.snatchGeneratorStore.peoples.length} title="Игроков онлайн" />
                            <NumberTitle
                                value={this.snatchGeneratorStore.players.length}
                                title="Игроков сделали вклад"
                                style={{ background: "rgba(2, 166, 242, 0.5)" }}
                            />
                            <SvgPieChart data={this.snatchGeneratorStore.playersVsPeoplesPie} />
                        </Gapped>
                    </PageWithWorkspace.Column>
                    <PageWithWorkspace.Column>
                        <SvgPieChart data={this.snatchGeneratorStore.playersSegmentsPie} />
                    </PageWithWorkspace.Column>
                </PageWithWorkspace.Body>
                <PageWithWorkspace.Bar>
                    <RateForm />
                </PageWithWorkspace.Bar>
            </PageWithWorkspace>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
