import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined, IsOptional } from 'class-validator';
import { Side } from 'src/sync/domain/enum/side.enum';
import { RegisterPartnerRequest } from 'src/sync/operation/request/register-partner.request';

@ApiExtraModels()
export class RegisterPartnerHttpRequestDto {
    @ApiProperty({
        description: 'partner name',
        example: 'partner',
        required: true,
        type: 'string',
        name: 'partner_name',
    })
    @IsString()
    @IsDefined()
    partner_name: string;

    @ApiProperty({
        description: 'calling side',
        example: 'we',
        required: true,
        type: 'string',
        name: 'calling_side',
    })
    @IsString()
    @IsDefined()
    calling_side: Side;

    @ApiProperty({
        description: 'storing side',
        example: 'we',
        required: true,
        type: 'string',
        name: 'storing_side',
    })
    @IsString()
    @IsDefined()
    storing_side: Side;

    @ApiProperty({
        description: 'redirect link uri encoded',
        example: 'https%3A%2F%2Fwww.google.com%2F%24%7BUID%7D',
        required: true,
        type: 'string',
        name: 'redirect_link',
    })
    @IsString()
    @IsOptional()
    redirect_link: string;


    toRequest(): RegisterPartnerRequest {
        return {
            partnerName: this.partner_name,
            callingSide: this.calling_side,
            storingSide: this.storing_side,
            redirectLink: this.redirect_link
        };
    }
}

