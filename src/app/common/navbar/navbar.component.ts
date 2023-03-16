import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from 'src/app/home/cart.service';
import { OrderService } from 'src/app/home/order.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  companyName = "ShopOn"
  addItemSubscriber: any;
  deleteCartItemSubscriber: any;
  placeOrderSubscriber: any;
  uniqueProductIdArray: number[] = []

  userContext = {
    "firstname": "Avik",
    "lastname": "Panja"
  }

  constructor(private cartService: CartService, private orderService: OrderService) {
    let observer1 = {
      next: (productId: number) => {
        if(productId> 0 && this.uniqueProductIdArray.indexOf(productId)==-1) {
          this.uniqueProductIdArray.push(productId);
        }
      }
    };
    this.addItemSubscriber = this.cartService.addItemSubject.subscribe(observer1);

    let observer2 = {
      next: (data: {productId: number, qty: string|undefined}) => {
        this.uniqueProductIdArray  = this.uniqueProductIdArray.filter(id => id!=data.productId);
      }
    };
    this.deleteCartItemSubscriber = this.cartService.removeItemSubject.subscribe(observer2);

    let observer3 = {
      next: () => this.uniqueProductIdArray = []
    };
    this.placeOrderSubscriber = this.orderService.placeOrderSubject.subscribe(observer3);
  }

  ngOnInit(): void {
    this.cartService.getCartItems()
    .subscribe(cart=>cart.cartItems.forEach(item=>this.uniqueProductIdArray.push(item.productId)));
  }

  ngOnDestroy(): void {
    this.addItemSubscriber.unsubscribe();
    this.deleteCartItemSubscriber.unsubscribe();
    this.placeOrderSubscriber.unsubscribe();
  }

  logOut() {}

}
