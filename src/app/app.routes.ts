import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './Components/page-not-found/page-not-found.component';
import {StockOverviewComponent} from './Components/stock-overview/stock-overview.component';
import {StockComponent} from './Components/stock/stock.component';
import {stockResolver} from "./Resolvers/StockResolver";

export const routes: Routes = [
  {path: 'stock-item/edit/:id', component: StockComponent, resolve: {stockItem: stockResolver}},
  {path: 'stock-item/create', component: StockComponent},
  {path: 'stock-item', component: StockComponent},
  {path: 'stock-overview', component: StockOverviewComponent},
  {path: '', redirectTo: '/stock-overview', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent},

];
