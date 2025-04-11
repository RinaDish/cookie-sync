import { ApiProperty } from '@nestjs/swagger';

class PartnerCallDataDto {
    @ApiProperty({ example: 'uid' })
    uid: string;
}

export class GetPartnerCallHttpResponseDto {
    @ApiProperty({ type: PartnerCallDataDto })
    data: PartnerCallDataDto[];

    @ApiProperty({ example: true })
    result: boolean;
}
