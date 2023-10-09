import { Module } from "@nestjs/common";
import { IngridientService } from "./ingridient.service";
import { IngridientController } from "./ingridient.controller";
import { TypedEventEmitter } from "typeorm";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Ingridient } from "src/entities/ingridient.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Ingridient])],
    controllers: [IngridientController],
    providers: [IngridientService]
})
export class IngridientModule {}