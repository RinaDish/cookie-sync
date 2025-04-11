import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString, IsDefined } from 'class-validator';
import { getClientIp, RequestWithSocket } from 'src/common/ip';
import { GetPartnerCallRequest } from '../../../operation/request/get-partner-call.request'

@ApiExtraModels()
export class GetPartnerCallHttpRequestDto {
  @ApiProperty({
    description: 'UID',
    example: 'uid123',
    required: true,
    type: 'string',
    name: 'uid',
  })
  @IsString()
  @IsDefined()
  uid: string;

  toRequest(id: string, req: Request): GetPartnerCallRequest {
    return {
        uid: this.uid,
        partnerId: id,
        ip: getClientIp(req as RequestWithSocket),
        userAgent: req.headers['user-agent'] ?? 'Unknown',
    };
  }
}

