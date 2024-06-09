import { IUserDTO } from "src/DTO/IUserDTO";
import { User } from "src/Entities/User";

export const toEntity = (userDTO: IUserDTO): User => {
    const entity = new User()
    
    entity.id = userDTO?.id
    entity.company = userDTO.company
    entity.firstName = userDTO.firstName
    entity.lastName = userDTO.lastName
    entity.jobTitle = userDTO?.jobTitle
    entity.password = userDTO.password;
    entity.workEmail = userDTO.workEmail;

    return entity
}