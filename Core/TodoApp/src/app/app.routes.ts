import { Routes } from '@angular/router';
import {HistoryPage} from './history-page/history-page';
import {ListPage} from './list-page/list-page';

export const routes: Routes = [{
  path:"HistoryPage" , component : HistoryPage},
  {path:"HistoryPage/ListPage" , component: ListPage}
];

