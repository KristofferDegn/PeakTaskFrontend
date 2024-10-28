import {Injectable, OnInit} from '@angular/core';
import {StockItem} from '../../Models/StockItem';
import {ConfigService} from '../config/config.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  controllerPath = '/api/stock'

  constructor(private configService: ConfigService,
              private http: HttpClient) {

  }

  getStockItems(): Observable<StockItem[]> {
    return this.http.get<StockItem[]>(`${this.configService.apiUrl}${this.controllerPath}`)
  }

  getStockItem(id: string | null): Observable<StockItem> {
    return this.http.get<StockItem>(`${this.configService.apiUrl}${this.controllerPath}/${id}`);
  }

  updateStockItem(id: number, item: StockItem) {
    return this.http.put<StockItem>(`${this.configService.apiUrl}${this.controllerPath}/${id}`, item);
  }

  createStockItem(item: StockItem) {
    return this.http.post<StockItem>(`${this.configService.apiUrl}${this.controllerPath}/`, item);
  }

  deleteStockItem(id: number) {
    this.http.delete<StockItem>(`${this.configService.apiUrl}${this.controllerPath}/${id}`).subscribe(() => {
      console.log("Stock deleted: " + id);
    });
  }
}
