import { computed, observable } from "mobx";

export class PagingModel {
    @observable
    private page: number = 1;

    constructor(private readonly itemsPerPage: number) {}

    @computed
    public get activePage() {
        return this.page;
    }

    public set activePage(pageNumber: number) {
        this.page = pageNumber;
    }

    @computed
    public get skipCount() {
        return (this.page - 1) * this.itemsPerPage;
    }

    public getPagesCount = (itemsCount: number) => {
        return Math.ceil(itemsCount / this.itemsPerPage);
    };

    public paginate = <T>(array: T[]) => {
        return array.slice(this.skipCount, this.skipCount + this.itemsPerPage);
    };

    public onPageChange = (page: number) => {
        this.activePage = page;
    };

    public reset = () => {
        this.activePage = 1;
    };
}
