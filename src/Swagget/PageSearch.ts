import { ApiProperty } from "@nestjs/swagger";
import { IPageSearch } from "src/DTO/IPageSearch";

export class PageSearchDto<T> implements IPageSearch<T> {
    @ApiProperty()
    page: number;
  
    @ApiProperty()
    pageSize: number;
  
    @ApiProperty()
    filter: T;
  }