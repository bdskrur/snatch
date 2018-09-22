import * as React from "react";
import { PageWithWorkspace } from "../../components/ContentWrappers/PageWithWorkspace/PageWithWorkspace";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../stores";
import { NumberTitle } from "../../components/NumberTitle/NumberTitle";
import { Gapped } from "retail-ui/components";
import { SvgPieChartPie } from "../../components/SvgPieChart/SvgPieChartPie";
import { Capitalization } from "../../components/Snatch/Capitalization/Capitalization";

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
                            <NumberTitle
                                value={this.snatchGeneratorStore.peoples.length}
                                title="Игроков онлайн"
                                style={{ background: "rgb(31, 45, 60)" }}
                            />
                            <NumberTitle
                                value={this.snatchGeneratorStore.players.length}
                                title="Игроков сделали вклад"
                                style={{ background: "rgba(2, 166, 242, 0.5)" }}
                            />
                            <SvgPieChartPie
                                data={this.snatchGeneratorStore.playersVsPeoplesPie}
                                radius={150}
                                hole={0}
                                labels={true}
                                percent={true}
                            />
                        </Gapped>
                    </PageWithWorkspace.Column>
                    <PageWithWorkspace.Column>
                        <Capitalization />
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
