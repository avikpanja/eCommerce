import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType,
  HttpResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { DataService } from './data.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {

  constructor(private dataService: DataService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    const url = request.url;
    //const body = request.body as {"productId": number};
   
    let response = new HttpResponse<unknown>();

    switch(url) {
      case "/addToCart":
        let data = request.body as {"productId": number};
        response = this.dataService.insertIntoCart(data); break;

      case "/allProducts":
        response = this.dataService.fetchAllProduct();break;

      case "/cart":
        response = this.dataService.fetchCartData(); break;

      case "/orderHistory":
        response = this.dataService.fetchOrderHistory(); break;

      case "/removeCartItem":
        let data1 = request.body as {"productId": number, "qty": string|null};
        response = this.dataService.deleteFromCart(data1); break;

      case "/placeAllOrder":
        response = this.dataService.moveCartToOrderHistory(); break;
    }
    
    return of(response);
  }
}
