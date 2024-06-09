import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entities/User';
import { Repository } from 'typeorm';
import { IPaginatedResult } from 'src/DTO/IPaginatedResult';
import { IUserReturnDTO } from 'src/DTO/IUserReturnDTO';
import { IUserSearchDTO } from 'src/DTO/IUserSearchDTO';
import { IPageSearch } from 'src/DTO/IPageSearch';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getOne(id: number) {
    return this.usersRepository.findOne({
      select: ['company', 'firstName', 'id', 'jobTitle', 'lastName', 'workEmail'],
      where: {
        id
      }
    })
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.createQueryBuilder("user")
      .where("UPPER(user.workEmail) = UPPER(:email)", { email })
      .getOne();
    return user;
  }

  async findUsersPaginated(search: IPageSearch<IUserSearchDTO>): Promise<IPaginatedResult<IUserReturnDTO>> {
    const { page, pageSize, filter } = search;

    const queryBuilder = this.usersRepository.createQueryBuilder('user')
        .select(['user.company', 'user.firstName', 'user.id', 'user.jobTitle', 'user.lastName', 'user.workEmail'])
        .skip((page - 1) * pageSize)
        .take(pageSize);

    if (filter?.company) {
        queryBuilder.andWhere('upper(user.company) LIKE upper(:company)', { company: `%${filter.company}%` });
    }

    if (filter?.jobTitle) {
        queryBuilder.andWhere('upper(user.jobTitle) LIKE upper(:jobTitle)', { jobTitle: `%${filter.jobTitle}%` });
    }

    const [data, total] = await queryBuilder.getManyAndCount();

    return { data, total, page, pageSize };
  }

  async deleteUser(id: number) {
    return this.usersRepository.delete(id)
  }
}
