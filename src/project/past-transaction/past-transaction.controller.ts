import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PastTransactionService } from './past-transaction.service';
import { CreatePastTransactionDto } from './dto/create-past-transaction.dto';
import { UpdatePastTransactionDto } from './dto/update-past-transaction.dto';
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

@Controller('past-transaction')
@ApiTags('Past-Transaction')
export class PastTransactionController {
  constructor(
    private readonly pastTransactionService: PastTransactionService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create' })
  create(@Body() createPastTransactionDto: CreatePastTransactionDto) {
    return this.pastTransactionService.create(createPastTransactionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all' })
  async findAll(
    @Query() { skip, limit, startId }: PaginationParams, // @Query('searchQuery') searchQuery?: string,
  ) {
    const searchQuery = '';
    return this.pastTransactionService.findAll(
      skip,
      limit,
      startId,
      searchQuery,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get by id' })
  findOne(@Param('id') id: string) {
    return this.pastTransactionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update' })
  update(
    @Param('id') id: string,
    @Body() updatePastTransactionDto: UpdatePastTransactionDto,
  ) {
    return this.pastTransactionService.update(id, updatePastTransactionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete' })
  remove(@Param('id') id: string) {
    return this.pastTransactionService.remove(id);
  }
}
