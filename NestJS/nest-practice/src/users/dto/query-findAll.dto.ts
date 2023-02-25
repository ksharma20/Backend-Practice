import { ApiProperty } from '@nestjs/swagger';

export class QueryDto {
  @ApiProperty({
    default: null,
  })
  isActive?: boolean;
}
