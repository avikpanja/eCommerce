import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Cart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnDestroy{

  addItemSubject = new BehaviorSubject<number>(-1);
  removeItemSubject = new Subject<{"productId": number, "qty": string|undefined}>();

  addItemSubscriber: any;
  deleteCartItemSubscriber: any;

  constructor(private httpClient: HttpClient) {
    let observer1 = {
      next: (productId: number) => {
        this.addToCart(productId).subscribe();
      }
    };
    this.addItemSubscriber = this.addItemSubject.subscribe(observer1);

    let observer2 = {
      next: (data: {productId: number, qty: string|undefined}) => {
        this.removeCartItem(data.productId,data.qty).subscribe();
      }
    };
    this.deleteCartItemSubscriber = this.removeItemSubject.subscribe(observer2);
  }
  ngOnDestroy(): void {
    this.addItemSubscriber.unsubscribe();
    this.deleteCartItemSubscriber.unsubscribe();
  }

  addToCart(productId: number): Observable<any> {
    let body = {
       "productId": productId
     }
     let val = this.httpClient.post<any>("/addToCart",body);
     return val;
   }
 
   getCartItems(): Observable<Cart> {
     return this.httpClient.get<Cart>("/cart");
   }
 
   removeCartItem(productId: number, qty?: string): Observable<Cart> {
     let body = {
       "productId": productId,
       "qty" : qty
     }
     return this.httpClient.post<Cart>("/removeCartItem",body);
   }
}
