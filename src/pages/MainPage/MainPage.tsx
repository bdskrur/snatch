import * as React from "react";
import { PageWithWorkspace } from "../../components/ContentWrappers/PageWithWorkspace/PageWithWorkspace";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";
import { SvgChart } from "../../components/SvgChart/SvgChart";
import { inject, observer } from "mobx-react";
import { RootStore } from "../../stores";
import { SvgChartContainer } from "../../components/SvgChart/SvgChartContainer";
import { WrapperForInput } from "../../components/ContentWrappers/WrapperForInput/WrapperForInput";

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
                    <WrapperForInput title={"Информация об игроках"} hint={"Информация"}>
                        <SvgChartContainer>
                            <SvgChart
                                width={500}
                                height={300}
                                models={[
                                    {
                                        data: this.snatchGeneratorStore.peopleGraph,
                                        stroke: "#2e3e52",
                                        polygonFill: "#2e3e52",
                                    },
                                    {
                                        data: this.snatchGeneratorStore.playerGraph,
                                        stroke: "#02a6f2",
                                    },
                                ]}
                            />
                        </SvgChartContainer>
                    </WrapperForInput>
                    {this.snatchGeneratorStore.peopleGraph}
                </PageWithWorkspace.Body>
                <PageWithWorkspace.Bar>
                    <RateForm />
                </PageWithWorkspace.Bar>
            </PageWithWorkspace>
        );
    }

    private snatchGeneratorStore = this.props.rootStore!.snatchGeneratorStore;
}
