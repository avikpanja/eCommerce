import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from './model/product';

import products from '../assets/products.json';
import { Cart, CartItem } from './model/cart';
import { OrderHistory } from './model/order-history';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  products: Product[] = [];

  constructor() { 
    this.prepareProductObject();
  }

  fetchAllProduct() : HttpResponse<unknown> {
    return this.prepareHttpResponse(200,"successfull",this.products);
  }

  insertIntoCart(body: {"productId": number}) : HttpResponse<unknown> {
    let response = new HttpResponse<unknown>();
    let product: Product | null = this.getProductByProductId(body.productId);
    if( product != null && product.unitAvailable > 0) {
      
      let cart: Cart = this.getCartObject();
      if(cart.addProduct(product)) {
        localStorage.setItem("cart", JSON.stringify(cart));
        response = this.prepareHttpResponse(200,"successfull", cart);
      } else {
        response = this.prepareHttpResponse(400,"Quantity exceeds limit")
      }
      
    } else {
      response =  this.prepareHttpResponse(400,"Invalid product id or product not available");
    }
    //localStorage.setItem("prodcuts", JSON.stringify(this.products));
    return response;
  }

  deleteFromCart(body: {"productId": number, "qty": string|null}) : HttpResponse<unknown> {
    let cart = this.getCartObject();
    let product = this.getProductByProductId(body.productId);

    if(product!=null) {
      if(body.qty == "*")
        cart.removeProduct(product);
      else
        cart.decreaseQuantity(product);

    }
    
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("prodcuts", JSON.stringify(this.products));
    return this.prepareHttpResponse(200,"successfull",cart);
  }

  moveCartToOrderHistory(): HttpResponse<unknown> { 
    let cart: Cart = this.getCartObject();
    let orederHistory = this.getOrderHistory();
    if(!cart.isEmpty) {
      orederHistory.addCartItems(cart.cartItems);
      this.reduceProductQuantity(cart.cartItems);
      
      localStorage.removeItem("cart");
      localStorage.setItem("order-history", JSON.stringify(orederHistory));
      localStorage.setItem("prodcuts", JSON.stringify(this.products));
    }

    return this.prepareHttpResponse(200,"successfull");
  }

  private reduceProductQuantity(cartItems: CartItem[]) {
    cartItems.forEach(
      item =>  {
        let product  = this.products.find(
          p => p.id == item.productId
        );
        if(product != undefined) {
          product.unitAvailable -= item.assumedUnit;
        }
      }
    )
  }

  fetchCartData(): HttpResponse<unknown> {
    let cartObj = this.getCartObject();
    return this.prepareHttpResponse(200,"successfull",cartObj);
  }
  fetchOrderHistory(): HttpResponse<unknown> {
    let orders = this.getOrderHistory();
    return this.prepareHttpResponse(200,"successfull",orders);
  }

  prepareProductObject(): void {
    let productsJson = localStorage.getItem("prodcuts");
    if(productsJson!=null) {
      this.products = JSON.parse(productsJson);
    } else {
      this.products = products;
      localStorage.setItem("prodcuts", JSON.stringify(this.products));
    }
  }

  private getCartObject(): Cart {
    let cartJson = localStorage.getItem("cart");
    let cart: Cart = new Cart();
    if(cartJson!=null) {
      let parsedObj = <Cart>JSON.parse(cartJson);
      
      cart.cartItems = parsedObj.cartItems;
      cart.isEmpty = parsedObj.isEmpty;
      
    }
    return cart;
  }

  private getOrderHistory(): OrderHistory {
    let orderJson = localStorage.getItem("order-history");
    let orderHistory: OrderHistory = new OrderHistory();
    if(orderJson!=null) {
      let parsedObj = <OrderHistory>JSON.parse(orderJson);
      
      orderHistory.orderedItems = parsedObj.orderedItems;
      
    }
    return orderHistory;
  }

  private getProductByProductId(productId: number): Product | null {

    for(let product of this.products) {
      if(product.id==productId) {
        return product;
      }
    }
    return null;
  }

  prepareHttpResponse(status: number, statusText: String, body?: any): HttpResponse<unknown> {
    return new HttpResponse({
      body: body,
      status: status,
      statusText: statusText.toString()
    });
  }
}
