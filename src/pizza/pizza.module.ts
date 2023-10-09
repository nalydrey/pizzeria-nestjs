import { Module } from "@nestjs/common";
import { PizzaController } from "./pizza.controller";
import { PizzaService } from "./pizza.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Pizza } from "src/entities/pizza.entity";
import { PizzaVariant } from "src/entities/pizza_variant.entity";
import { Ingridient } from "src/entities/ingridient.entity";
import { ConfigService } from "@nestjs/config";
import { PictureService } from "src/picture/picture.service";
import { PictureModule } from "src/picture/picture.module";

@Module({
    imports: [TypeOrmModule.forFeature([Pizza, PizzaVariant, Ingridient]), PictureModule],
    controllers: [PizzaController],
    providers: [PizzaService, ConfigService]
})
export class PizzaModule {}