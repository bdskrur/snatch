import { Api } from "./api";
import { fakeApi } from "./fake-api";

const apiInstance: Api = __FAKE_API__ ? fakeApi : new Api();

export { apiInstance };
