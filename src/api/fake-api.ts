import { Api } from "./api";
import { ApiEntityResult } from "../models/ApiResults/ApiEntityResult";
/* tslint:disable */
export const fakeApi: Api = {
    getUser() {
        return new Promise(resolve =>
            setTimeout(
                () =>
                    resolve(
                        ApiEntityResult.Success({
                            login: "kontur\\null",
                            name: "Houston Whitney Elizabeth",
                            isSuperAdmin: true
                        })
                    ),
                200 + Math.random() * 800
            )
        );
    },
}
