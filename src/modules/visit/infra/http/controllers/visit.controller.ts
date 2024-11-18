import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CreateVisitaByRequestDto } from "src/modules/visit/application/dtos/create-visit.dto";
import { CreateVisitService } from "src/modules/visit/application/services/create-visit.service";
import { AuthGuard } from "src/shared/guards/auth.guard";

@UseGuards(AuthGuard)
@Controller('visits')
export class VisitController {
  constructor(
    private readonly createVisitService: CreateVisitService
  ) { }

  @Post()
  async create(@Body() createVisitDto: CreateVisitaByRequestDto): Promise<void> {
    await this.createVisitService.execute(createVisitDto);
  }
}