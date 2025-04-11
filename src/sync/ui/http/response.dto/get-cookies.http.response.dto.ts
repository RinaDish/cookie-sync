import { ApiProperty } from '@nestjs/swagger';

class Cookie {
    [key: string]: string;
  }

export class GetCookiesHttpResponseDto {
    @ApiProperty({ type: Cookie })
    data: Cookie[];

    @ApiProperty({ example: true })
    result: boolean;
}
