import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query
} from '@nestjs/common';
import { CurrentTransactionService } from './current-transaction.service';
import { CreateCurrentTransactionDto } from './dto/create-current-transaction.dto';
import { UpdateCurrentTransactionDto } from './dto/update-current-transaction.dto';
import { PaginationParams } from 'src/utils/paginationParams';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

@Controller('Current-transaction')
@ApiTags('Current-Transaction')
export class CurrentTransactionController {
  constructor(
    private readonly CurrentTransactionService: CurrentTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createCurrentTransactionDto: CreateCurrentTransactionDto) {
    return this.CurrentTransactionService.create(createCurrentTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'get all' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.CurrentTransactionService.findAll(
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id' })
  findOne(@Param('id') id: string) {
    return this.CurrentTransactionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  update(
    @Param('id') id: string,
    @Body() updateCurrentTransactionDto: UpdateCurrentTransactionDto,
  ) {
    return this.CurrentTransactionService.update(
      id,
      updateCurrentTransactionDto,
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id') id: string) {
    return this.CurrentTransactionService.remove(id);
  }
}
