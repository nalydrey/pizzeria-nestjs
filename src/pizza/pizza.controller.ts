import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { PizzaService } from "./pizza.service";
import { CreatePizzaDto } from "./dto/create_pizza.dto";
import { UpdatePizzaDto } from "./dto/update_pizza.dto";

@Controller('pizza')
export class PizzaController {
    constructor(private readonly pizzaService: PizzaService) {}

    @Post()
    createPizza(@Body() createPizzaDto: CreatePizzaDto){
        return this.pizzaService.createPizza(createPizzaDto)
    }

    @Get()
    getAllPizza(){
        return this.pizzaService.getAllPizza()
    }
  
    @Delete(':id')
    deletePizza(@Param('id', ParseIntPipe) id: number){
        return this.pizzaService.deletePizzaById(id)
    }
  
    @Put(':id')
    updatePizza(@Param('id', ParseIntPipe) id: number, @Body() updatePizzaDto: UpdatePizzaDto){
        return this.pizzaService.updatePizzaById(id, updatePizzaDto)
    }
}