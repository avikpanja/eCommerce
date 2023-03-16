import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Cart } from '../model/cart';
import { OrderHistory } from '../model/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderService implements OnDestroy{

  placeOrderSubject = new Subject<string>();

  placeOrderSubscriber: any;

  constructor(private httpClient: HttpClient) { 
    let observer = {
      next: () => {
        this.placeOrder().subscribe();
      }
    };
    this.placeOrderSubscriber = this.placeOrderSubject.subscribe(observer);
  }
  ngOnDestroy(): void {
    this.placeOrderSubscriber.unsubscribe();
  }

  placeOrder(): Observable<Cart> {
    return this.httpClient.post<Cart>("/placeAllOrder", {});
  }

  getOrderHistory(): Observable<OrderHistory> {
    return this.httpClient.get<OrderHistory>("/orderHistory");
  }
}
