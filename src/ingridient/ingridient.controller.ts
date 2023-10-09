import { Body, Get, Controller, Post, Delete, ParseIntPipe, Param, Put } from "@nestjs/common";
import { IngridientService } from "./ingridient.service";
import { CreateIngridientDto } from "./dto/create_ingridient.dto";
import { UpdateIngridientDto } from "./dto/update_ingridient.dto";

@Controller('ingridient')
export class IngridientController {
    constructor(private ingridientService: IngridientService){}
  
    @Get()
    getAll(){
        return this.ingridientService.getAll()
    }

    @Get('types')
    distinctTypes(){
        return this.ingridientService.getDistinctTypes()
    }

    @Post()
    create(@Body() createIngridientDto: CreateIngridientDto){
        return this.ingridientService.create(createIngridientDto)
    }
   
    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateIngridientDto: UpdateIngridientDto){
        return this.ingridientService.update(id, updateIngridientDto)
    }
  
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number){
        return this.ingridientService.delete(id)
    }
} 


