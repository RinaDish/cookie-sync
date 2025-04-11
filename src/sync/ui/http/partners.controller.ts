import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getClientIp, RequestWithSocket } from 'src/common/ip';
import { GetPartnerLinksHandler } from 'src/sync/operation/handler/get-partner-links.handler';
import { RegisterPartnerHandler } from 'src/sync/operation/handler/register-partner.handler';
import { RegisterPartnerRequest } from 'src/sync/operation/request/register-partner.request';
import { RegisterPartnerHttpRequestDto } from './request.dto/register-partner.http.request';
import { GetPartnerCallHttpResponseDto } from './response.dto/get-partner-call.http.response.dto';
import { GetPartnerLinksHttpResponseDto } from './response.dto/get-partner-links.response.dto';
import { RegisterPartnerHttpResponseDto } from './response.dto/register-partner.http.response.dto';

@ApiTags('Partner')
@Controller('settings/partner')
export class PartnersController {
  constructor(
    private readonly registerPartnerHandler: RegisterPartnerHandler,
    private readonly getPartnerLinksHandler: GetPartnerLinksHandler,
  ) {}

  @ApiOperation({ summary: 'Register partner' })
  @ApiResponse({
    status: 200,
    description: 'Register partner',
    type: RegisterPartnerHttpResponseDto,
  })
  @Post('')
  async refisterPartner(
    @Body() body: RegisterPartnerHttpRequestDto,
  ): Promise<RegisterPartnerHttpResponseDto> {
    const res = await this.registerPartnerHandler.handle(body.toRequest());
    return {
      data: [res],
      result: true, // ToDo
    };
  }

  @ApiOperation({ summary: 'Get partners links' })
  @ApiResponse({
    status: 200,
    description: 'Get partners links',
    type: GetPartnerLinksHttpResponseDto,
  })
  @Get('')
  async getPartnerLinks(
    @Req() req: Request,
  ): Promise<GetPartnerLinksHttpResponseDto> {
    const ip = getClientIp(req as RequestWithSocket);
    const userAgent = req.headers['user-agent'] ?? 'Unknown';

    const res = await this.getPartnerLinksHandler.handle({ ip, userAgent });
    return {
      data: res,
      result: true, // ToDo
    };
  }
}
