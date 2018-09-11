import { observable, computed } from "mobx";
import { IUser } from "../models";

interface IUserInfo {
    user: IUser;
    timestamp: number;
}

export class AppStore {
    @observable
    private userInfo: IUserInfo;

    public pages = [{ name: "/main", title: "Main" }];

    @computed
    public get userIsAdmin() {
        return this.userInfo && this.userInfo.user.isSuperAdmin;
    }

    @computed
    public get userDomainLogin() {
        if (!this.userInfo) {
            return "";
        }

        return this.userInfo.user.login;
    }

    @computed
    public get userInitials() {
        if (!this.userInfo) {
            return "loading...";
        }

        const tokens = this.userInfo.user.name.split(" ");
        const surname = tokens[0];
        const nameInitial = tokens[1][0] + ".";
        const middleNameInitial = tokens[2][0] + ".";

        return surname + " " + nameInitial + " " + middleNameInitial;
    }
}
