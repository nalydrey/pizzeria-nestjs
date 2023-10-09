export class CreatePizzaDto {
    label: string
    name: string
    imgUrl: string
    variants: PizzaVariantForm[]
    ingridients: number[]
}

interface PizzaVariantForm {
    price: number
    size: number
    weight: number
  }