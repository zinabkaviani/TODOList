import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HistoryPage implements OnInit {
  history: { date: string; tasks: { id: number; text: string; completed: boolean }[] }[] = [];

  constructor(private router: Router, private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.history = data;
    });
  }

  openDay(date: string) {
    this.router.navigate(['/list', date]);
  }
}
