import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/model/cart';
import { Product } from 'src/app/model/product';
import { CartService } from '../cart.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

 items: Product[] = [];
 productsInCart: number[] = [];

  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit(): void {
    this.productService
      .getAllProducts()
      .subscribe(items=> this.items = items);
    this.cartService.getCartItems()
      .subscribe(cart => {
        this.productsInCart = cart.cartItems.map(i=>i.productId)
      });
    
  }

  addToCart(productId: number): void {
    this.cartService.addItemSubject.next(productId);
    this.productsInCart.push(productId);
  }
}
