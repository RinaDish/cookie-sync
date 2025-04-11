import { ApiProperty } from '@nestjs/swagger';

export class GetPartnerLinksHttpResponseDto {
  @ApiProperty({
    type: 'string',
  })
  data: string[];

  @ApiProperty({
    example: true,
  })
  result: boolean;
}
