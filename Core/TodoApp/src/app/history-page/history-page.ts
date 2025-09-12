import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.html',
  styleUrls: ['./history-page.css'],
  standalone: true,
  imports: [CommonModule, RouterModule],
})
export class HistoryPage implements OnInit {
  history: { date: string; tasks: { id: number; text: string; completed: boolean }[] }[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks().subscribe(data => {
      this.history = data;
    });
  }
}
