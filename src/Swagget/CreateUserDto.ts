import { ApiProperty } from "@nestjs/swagger";
import { IUserDTO } from "src/DTO/IUserDTO";

export class CreateUserDto implements IUserDTO {
    @ApiProperty()
    firstName: string;
  
    @ApiProperty()
    lastName: string;
  
    @ApiProperty()
    company: string;
  
    @ApiProperty({ required: false }) // Se desejar, pode adicionar propriedades opcionais
    jobTitle?: string;
  
    @ApiProperty()
    workEmail: string;
  
    @ApiProperty()
    password: string;
  }