import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { IPageSearch } from 'src/DTO/IPageSearch';
import { IUserSearchDTO } from 'src/DTO/IUserSearchDTO';
import { UsersService } from 'src/services/users/users.service';

@Controller('users')
export class UsersController {

    constructor (private usersService: UsersService) {}

    @Post('/search')
    @HttpCode(200)
    async searchUser(@Body() pageSearchDTO: IPageSearch<IUserSearchDTO>, @Res() res: Response) {
        const result = await this.usersService.findUsersPaginated(pageSearchDTO)
        if (result.data.length === 0) {
            return res.status(HttpStatus.NO_CONTENT).json(result);
        }
        return res.status(HttpStatus.OK).json(result);
    }

    @Get('/:id')
    async getOne(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const user = await this.usersService.getOne(id);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
        }
        return res.status(HttpStatus.OK).json(user);
    }

    @Delete('/:id')
    async deleteUser(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {
        const deleted = await this.usersService.deleteUser(id);
        if (!deleted.affected) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'User not found.' });
        }
        return res.status(HttpStatus.OK).json({ message: 'User deleted successfully.' });
    }
}
