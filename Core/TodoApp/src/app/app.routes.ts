import { Routes } from '@angular/router';
import { HistoryPage } from './history-page/history-page';
import { ListPage } from './list-page/list-page';

export const routes: Routes = [
  { path: 'history', component: HistoryPage },
  { path: 'list/:date', component: ListPage },
  { path: '', redirectTo: '/history', pathMatch: 'full' },
];
