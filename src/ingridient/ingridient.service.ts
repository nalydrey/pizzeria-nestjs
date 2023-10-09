import { ConflictException, HttpException, Injectable } from "@nestjs/common";
import { CreateIngridientDto } from "./dto/create_ingridient.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Ingridient } from "src/entities/ingridient.entity";
import { Repository } from "typeorm";
import { UpdateIngridientDto } from "./dto/update_ingridient.dto";
import { log } from "console";


@Injectable()
export class IngridientService {
    constructor(@InjectRepository(Ingridient) private ingridientRepo: Repository<Ingridient>) {}

    async create(createIngridientDto: CreateIngridientDto) {
        console.log('create ingridient');
        console.log(createIngridientDto);
        try{
            const {name, portionPrice, portionWeight, isOption, type} = createIngridientDto
            const existIngridient = await this.ingridientRepo.findOneBy({name: createIngridientDto.name, type: createIngridientDto.type})
            if(existIngridient) throw new ConflictException('Ingridient with the same both name and type already exist')
            const ingridient = await this.ingridientRepo.save({
                name: name.toLowerCase(),
                type: type.toLowerCase(),
                portionPrice,  
                portionWeight,
                isOption
            })
            console.log('ingridient');
        
            return {
                ingridient
            }
        }
        catch(err){
            console.log('error in process of creating ingridient');
            throw new HttpException('error in process of creating ingridient', 500)
        }
        
    }
    async delete(id: number) {
        const ingridient = await this.ingridientRepo.findOneBy({id})
        if(ingridient){
            ingridient.pizza = []
            await this.ingridientRepo.save(ingridient)
        }
        await this.ingridientRepo.delete(id)
        return {
            ingridient
        }
    }
    async update(id: number, updateIngridientDto: UpdateIngridientDto) {
        console.log('update ingridient');
        
        console.log('update', updateIngridientDto);
        
        const existIngridient = await this.ingridientRepo.findOneBy({name: updateIngridientDto.name, type: updateIngridientDto.type})
        if(existIngridient) throw new ConflictException('Ingridient with the same both name and type already exist')
        await this.ingridientRepo.update(id, updateIngridientDto)
        const ingridient = await this.ingridientRepo.findOneBy({id})
        console.log(ingridient);
        
        return {
            ingridient
        }
    }

    async getAll() {
        const ingridients = await this.ingridientRepo.find()
        return {
            ingridients
        }
    }

    async getDistinctTypes() {
        const types: {type: string}[] = await this.ingridientRepo.query('SELECT DISTINCT type from ingridient')
        const typesArr: string[] = types.map(ingridient => ingridient.type)
        return {types: typesArr}
    }
   
}