import { Component, OnInit } from '@angular/core';
import { OrderHistory } from 'src/app/model/order-history';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orderHistory = new OrderHistory();

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getOrderHistory()
      .subscribe(orders => this.orderHistory = orders);
  }

}
