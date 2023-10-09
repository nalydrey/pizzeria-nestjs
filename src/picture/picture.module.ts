import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Picture } from "src/entities/picture.entity";
import { PictureController } from "./picture.controller";
import { PictureService } from "./picture.service";
import { PizzaModule } from "src/pizza/pizza.module";
import { PizzaService } from "src/pizza/pizza.service";

@Module({
    controllers: [PictureController],
    providers: [PictureService],
    imports: [TypeOrmModule.forFeature([Picture])],
    exports: [PictureService]
})
export class PictureModule {}