import { Product } from "./product";

export class CartItem {
    productId!: number;
    productName!: string;
    productColor!: string;
    unitPrice!: number;
    totalPrice !: number;
    assumedUnit!: number;
    productImage!: string;
    maxUnitReached !: boolean;

    constructor() {}

    setProductId(productId: number): void { this.productId = productId; }
    setProductName(productName: string): void { this.productName = productName; } 
    setProductColor(productColor: string): void { this.productColor = productColor; } 
    setAssumedUnit(assumedUnit: number): void { this.assumedUnit = assumedUnit; }
    setProductPrice(productPrice: number): void { this.unitPrice = productPrice; }
    setProductImage(productImage: string): void { this.productImage = productImage; } 

    setAllFields(product: Product): void {
        this.setProductId(product.id);
        this.setProductName(product.name);
        this.setProductColor(product.color);
        this.setAssumedUnit(1);
        this.setProductPrice(product.price);
        this.setProductImage(product.image);
        this.totalPrice = this.unitPrice * this.assumedUnit;
        this.maxUnitReached = this.assumedUnit == product.unitAvailable;
    }

    // decreaseQuantity(): void {
    //     this.assumedUnit -= 1;
    //     this.totalPrice = this.unitPrice*this.assumedUnit;
    //     this.maxUnitReached = false;
    // }
}

export class Cart {
    cartItems : CartItem[] = [];
    isEmpty: boolean = true;

    constructor() {}

    addProduct(product: Product): boolean {

        if(product == null) throw new Error("Product should't be null");
        if(product.unitAvailable==0) throw new Error("Product not available");

        let existingItem: CartItem | null = this.findByProductId(product.id);
        let successfull : boolean = false;
        if(existingItem == null) {
            existingItem = new CartItem();
            existingItem.setAllFields(product);
            this.cartItems.push(existingItem);
            this.isEmpty = false;
            successfull = true;
        } else if(existingItem.assumedUnit!=product.unitAvailable){ 
            existingItem.assumedUnit += 1;
            existingItem.totalPrice = existingItem.unitPrice*existingItem.assumedUnit;
            existingItem.maxUnitReached = existingItem.assumedUnit == product.unitAvailable;
            successfull = true;
        }   
        return successfull;
    }

    removeProduct(product: Product): void {
        let cartItem = this.findByProductId(product.id);
        
        if(cartItem == null) return;
        
       // if(cartItem.assumedUnit==1) {
            this.cartItems = this.cartItems.filter(item => item.productId != product.id);
            this.isEmpty = this.cartItems.length==0;
        // } else {
        //     cartItem.assumedUnit -= 1;
        //     cartItem.totalPrice = cartItem.unitPrice*cartItem.assumedUnit;
        //     cartItem.maxUnitReached = cartItem.assumedUnit == product.unitAvailable;
        // }
        
    }

    decreaseQuantity(product: Product): void {
        let cartItem = this.findByProductId(product.id);
        
        if(cartItem == null) return;
        cartItem.assumedUnit -= 1;
        cartItem.totalPrice = cartItem.unitPrice*cartItem.assumedUnit;
        cartItem.maxUnitReached = false;
    }

    private findByProductId(productId: number): CartItem | null {
        let item = this.cartItems.find(item => item.productId==productId);
        if(item == undefined) {
            return null;
        }
        return item;
    }
}