export class Product {
    id: number;
    name: string;
    catagory: string;
    brand: string;
    color: string;
    price: number;
    unitAvailable: number;
    image: string;

    constructor(id: number, name: string,
        catagory: string,
        brand: string,
        color: string,
        price: number,
        unitAvailable: number,
        image: string) {
        
            this.id = id;
            this.name = name;
            this.catagory = catagory;
            this.brand = brand;
            this.color = color;
            this.price = price;
            this.unitAvailable = unitAvailable;
            this.image = image;
    }

}