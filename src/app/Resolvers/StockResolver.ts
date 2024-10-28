import {ResolveFn} from '@angular/router';
import {StockService} from '../Services/stock/stock.service';
import {inject} from '@angular/core';

export const stockResolver: ResolveFn<Object> = (route, state) => {
  const stockItemId = route.paramMap.get('id');
  return inject(StockService).getStockItem(stockItemId)
}
