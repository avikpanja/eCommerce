import { Cart, CartItem } from "./cart";

export class OrderHistory {
    orderedItems: OrderedItem[] = [];
    isEmpty: boolean = true;

    addCartItems(cartItems: CartItem[]): void {
        let date = new Date();
        cartItems.map(item => new OrderedItem(item))
            .forEach(item => {
                item.setOrderDateTime(date);
                this.orderedItems.push(item)
            });
        
    }
}
class OrderedItem {
    productId!: number;
    productName!: string;
    totalPrice !: number;
    orderedUnit!: number;
    productColor !: string;
    productImage!: string;

    orderDateTime!: Date

    constructor(cartItem?: CartItem) {
        if(cartItem!=null) {
            this.setAllFields(cartItem);
        }
    }

    setAllFields(item: CartItem): void {
        this.productId = item.productId;
        this.productName = item.productName;
        this.orderedUnit = item.assumedUnit;
        this.totalPrice = item.totalPrice;
        this.productImage = item.productImage;
        this.productColor = item.productColor;
    }

    setOrderDateTime(date: Date) {
        this.orderDateTime = date;
    }
}