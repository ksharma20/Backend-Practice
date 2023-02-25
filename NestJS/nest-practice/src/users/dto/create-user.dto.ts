import { ApiHideProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiHideProperty()
  id: number;
  fname: string;
  lname: string;
  isActive: boolean;
}
