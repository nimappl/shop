import { Filter } from "./filter";

export class GridData<T> {
    data: T[];
    filters: Filter[] = new Array<Filter>();
    sortBy: string;
    sortType: sortType = sortType.Asc;
    pageSize: number = 5;
    PageNumber: number = 1;
    count: number;
}

export enum sortType {
    Asc,
    Desc,
}