import { ApiProperty } from '@nestjs/swagger';

export class RegisterPartnerHttpResponseDto {
  @ApiProperty({
    type: 'string',
  })
  data: string[];

  @ApiProperty({
    example: true,
  })
  result: boolean;
}
