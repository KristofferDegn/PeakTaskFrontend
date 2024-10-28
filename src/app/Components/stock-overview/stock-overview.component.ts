import {Component, OnInit} from '@angular/core';
import {StockService} from '../../Services/stock/stock.service';
import {Observable} from 'rxjs';
import {StockItem} from '../../Models/StockItem';
import {AsyncPipe} from '@angular/common';
import {Router} from "@angular/router";

@Component({
  selector: 'app-stock-overview',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  templateUrl: './stock-overview.component.html',
  styleUrl: './stock-overview.component.scss'
})
export class StockOverviewComponent implements OnInit {

  stockItems$!: Observable<StockItem[]>;

  constructor(private stockService: StockService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.stockItems$ = this.stockService.getStockItems();
  }

  onEditClick(stockItem:StockItem): void {
    this.router.navigate([`stock-item/edit`, stockItem.id]);
  }

  onCreateClick(): void {
    this.router.navigate([`stock-item/create`]);
  }


}
