import { Controller, Get, Param, Query, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCookiesHandler } from 'src/sync/operation/handler/get-cookies.handler';
import { GetPartnerCallHandler } from '../../operation/handler/get-partner-call.handler';
import { GetPartnerCallHttpRequestDto } from './request.dto/get-partner-call.http.request.dto';
import { GetCookiesHttpResponseDto } from './response.dto/get-cookies.http.response.dto';
import { GetPartnerCallHttpResponseDto } from './response.dto/get-partner-call.http.response.dto';

@ApiTags('Sync')
@Controller('')
export class CookiesController {
  constructor(
    private readonly getPartnerCallHandler: GetPartnerCallHandler,
    private readonly getCookiesHandler: GetCookiesHandler,
  ) {}

  @ApiOperation({ summary: 'Get partner call' })
  @ApiResponse({
    status: 200,
    description: 'Get partner call',
    type: GetPartnerCallHttpResponseDto,
  })
  @Get(':id')
  async getPartnerCall(
    @Req() req: Request,
    @Param('id') id: string,
    @Query() query: GetPartnerCallHttpRequestDto,
  ): Promise<GetPartnerCallHttpResponseDto> {
    const res = await this.getPartnerCallHandler.handle(
      query.toRequest(id, req),
    );
    return {
      data: [{ uid: res }],
      result: true, // ToDo
    };
  }

  @ApiOperation({ summary: 'Get cookies for partner' })
  @ApiResponse({
    status: 200,
    description: 'Get partner call',
    type: GetPartnerCallHttpResponseDto,
  })
  @Get('cookies/:id')
  async getCookies(
    @Param('id') id: string,
  ): Promise<GetCookiesHttpResponseDto> {
    const res = await this.getCookiesHandler.handle(id);
    return {
      data: [res],
      result: true, // ToDo
    };
  }
}
