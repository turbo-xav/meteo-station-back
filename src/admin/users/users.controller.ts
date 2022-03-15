import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorator/roles.decorator';
import { Meteo_User } from 'src/models/user.entity';
import { UsersService } from './users.service';

@Controller('admin/users')
@ApiHeader({
  name: 'Authorization',
  description: 'Bearer xxxxxxxxxxxxxxxxxxxxxxxx',
})
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Get city detail
   *
   * @param city city name
   */

  @ApiResponse({
    status: 200,
    type: Meteo_User,
    description: 'List of users',
  })
  @Get('')  
  async user(): Promise<Meteo_User[]> {
    return this.usersService.users();
  }
}
