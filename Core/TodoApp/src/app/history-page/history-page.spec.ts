import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrls: ['./list-page.css'],
  standalone: true
})
export class ListPage {
  selectedDate: string = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.selectedDate = params['date'] || '';
    });
  }
}
