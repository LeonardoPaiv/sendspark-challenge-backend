import { ApiProperty } from "@nestjs/swagger";
import { ILoginDTO } from "src/DTO/ILoginDTO";

export class LoginDto implements ILoginDTO {
    @ApiProperty()
    email: string;
  
    @ApiProperty()
    password: string;
  }