import { ConflictException, Inject, Injectable } from "@nestjs/common";
import { CreatePizzaDto } from "./dto/create_pizza.dto";
import { In, Repository } from "typeorm";
import { Pizza } from "src/entities/pizza.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdatePizzaDto } from "./dto/update_pizza.dto";
import { PizzaVariant } from "src/entities/pizza_variant.entity";
import { Ingridient } from "src/entities/ingridient.entity";
import { ConfigService } from "@nestjs/config";
import { PictureService } from "src/picture/picture.service";

@Injectable()
export class PizzaService {
    private hostPath: string

    constructor(
        private configService: ConfigService,
        private pictureService: PictureService,
        @InjectRepository(Pizza) private pizzaRepo: Repository<Pizza>,
        @InjectRepository(Ingridient) private ingridientRepo: Repository<Ingridient>,
        @InjectRepository(PizzaVariant) private pizzaVarRepo: Repository<PizzaVariant>
        ) {
            this.hostPath = `${this.configService.get('EXPRESS_PROTOCOL')}://${this.configService.get('EXPRESS_HOST')}:${this.configService.get('EXPRESS_PORT')}/`
        }

    async createPizza(createPizzaDto: CreatePizzaDto){
        console.log('create pizza');
        console.log(createPizzaDto);
        
        
        const existPizza = await this.pizzaRepo.findOneBy({name: createPizzaDto.name})
        if(existPizza) throw new ConflictException('Product with the same name already exist')

        const ingridients = await this.ingridientRepo.findBy({id: In(createPizzaDto.ingridients)})

        const newPizza = await this.pizzaRepo.save({
            name: createPizzaDto.name,
            label: createPizzaDto.label,
            imgUrl: createPizzaDto.imgUrl,
            ingridients: ingridients
        })

        await Promise.all(createPizzaDto.variants.map(variant => (
           this.pizzaVarRepo.save({
                pizza: newPizza,
                price: variant.price,
                size: variant.size,
                weight: variant.weight
            }))
        ))
        
        const pizza = await this.pizzaRepo.findOneBy({id: newPizza.id})
        if(pizza){
            pizza.imgUrl = this.hostPath + pizza.imgUrl
        }

        return {pizza}
    }
    
    async getAllPizza(){
        console.log(this.hostPath);
        const pizza = await this.pizzaRepo.find()
        pizza.forEach(singlePizza => {
            if(singlePizza.imgUrl)
            singlePizza.imgUrl = this.hostPath + singlePizza.imgUrl
        })
        return {pizza}
    }
  
    async updatePizzaById(id: number, updatePizzaDto: UpdatePizzaDto){
        const existPizza = await this.pizzaRepo.findOneBy({name: updatePizzaDto.name})
        if(existPizza) throw new ConflictException('Product with the same name already exist')
        const ingridients = await this.ingridientRepo.findBy({id: In(updatePizzaDto.ingridients)})

        const pizza = await this.pizzaRepo.save({
            id,
            name: updatePizzaDto.name,
            label: updatePizzaDto.label,
            imgUrl: updatePizzaDto.imgUrl,
            ingridients: ingridients
        })

        if(pizza){
            pizza.imgUrl = this.hostPath + pizza.imgUrl
        }
        return {pizza}
    }
    
    async deletePizzaById(id: number){
        console.log('delete Pizza');
        const existPizza = await this.pizzaRepo.findOneBy({id})
        if(existPizza){
            existPizza.ingridients = []
            await this.pizzaRepo.save(existPizza)
            const pizza = await this.pizzaRepo.delete(id)

            this.pictureService.deleteFileByName(existPizza.imgUrl)
        }

        // if(pizza){
        //     pizza.imgUrl = this.hostPath + pizza.imgUrl
        // }
        return {pizza: existPizza}
    }


}