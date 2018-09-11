import { IUser } from "../models";
import { get } from "../utils/requests";

export class Api {
    public getUser = () => {
        return get<IUser>("api/user");
    };
}
