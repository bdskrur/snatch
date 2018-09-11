import * as React from "react";
import { PageWithWorkspace } from "../../components/ContentWrappers/PageWithWorkspace/PageWithWorkspace";
import { RateForm } from "../../components/Snatch/RateForm/RateForm";

export class MainPage extends React.Component {
    public render() {
        return (
            <PageWithWorkspace>
                <PageWithWorkspace.Body>Body</PageWithWorkspace.Body>
                <PageWithWorkspace.Bar>
                    <RateForm />
                </PageWithWorkspace.Bar>
            </PageWithWorkspace>
        );
    }
}
