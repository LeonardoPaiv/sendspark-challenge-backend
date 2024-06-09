export interface IPaginatedResult<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
}