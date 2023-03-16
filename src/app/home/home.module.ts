import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { RequestInterceptor } from '../request.interceptor';



@NgModule({
  declarations: [
    HomeComponent,
    CartComponent,
    OrderHistoryComponent
  ],
  imports: [
    CommonModule,
    //HttpClientModule,
    HomeRoutingModule
  ],
  providers: [
    //{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true }
  ]
})
export class HomeModule { }
