import { Component, OnDestroy, OnInit } from '@angular/core';
import { Cart } from 'src/app/model/cart';
import { CartService } from '../cart.service';
import { OrderService } from '../order.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy{
  cart = new Cart();
  totalCartValue: number = 0;

  constructor(private cartService: CartService, private orderService: OrderService) { 
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.cartService
      .getCartItems()
      .subscribe(cart => {
        this.cart = cart;
        this.updateTotalCartValue();
      });
  }

  addQuantity(id: number): void {
    this.cartService.addToCart(id)
    .subscribe(cart => {
      if(this.cart != null) {
        this.cart = cart; 
        this.updateTotalCartValue()
      } else {

      }
      
    });
  }

  removeOneCartItemFully(id: number): void {
    this.cartService.removeItemSubject
    .next({"productId": id, "qty": "*"});
    this.cart.cartItems = this.cart.cartItems.filter(item => item.productId!=id);
    this.updateTotalCartValue();
  }

  minusQuantity(id: number): void {
    this.cartService.removeCartItem(id)
      .subscribe(cart => {
        this.cart = cart; 
        this.updateTotalCartValue()
      });
  }

  updateTotalCartValue(): void {
    this.totalCartValue =
      this.cart.cartItems
        .map(item => item.totalPrice)
        .reduce((a,b)=>a+b,0);
  }

  placeOrders(): void {
    // this.orderService.placeAllOrder()
    //   .subscribe(()=>{
    //     this.cart = new Cart();
    //     alert("Order placed!");
    //   })
    this.orderService.placeOrderSubject.next("Order placed");
    this.cart.cartItems = [];
    alert("Order placed successfully")
  }
}
