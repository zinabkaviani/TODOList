import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../task.service';
import { CommonModule } from '@angular/common'; // Import CommonModule
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.html',
  styleUrls: ['./list-page.css'],
  standalone: true,
  imports: [CommonModule, FormsModule], // Add CommonModule and FormsModule
})
export class ListPage implements OnInit {
  newTodo: string = '';
  selectedDate: string = '';
  tasks: { id: number; text: string; completed: boolean }[] = [];

  constructor(private route: ActivatedRoute, private taskService: TaskService) {}

  ngOnInit() {
    // Get date from route parameter
    this.route.params.subscribe(params => {
      this.selectedDate = params['date'] || new Date().toISOString().split('T')[0];
      this.loadTasks();
    });
  }

  loadTasks() {
    this.taskService.getTasks(this.selectedDate).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  createTodo() {
    const value = this.newTodo.trim();
    if (!value) return;

    this.taskService.addTask(this.selectedDate, value).subscribe(tasks => {
      this.tasks = tasks;
      this.newTodo = '';
    });
  }

  toggleTaskCompletion(task: { id: number; text: string; completed: boolean }) {
    this.taskService
      .updateTask(this.selectedDate, task.id, undefined, !task.completed)
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(this.selectedDate, id).subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  editTask(id: number, newText: string | null) {
    const trimmedText = (newText ?? '').trim();
    if (trimmedText) {
      this.taskService.updateTask(this.selectedDate, id, trimmedText).subscribe(tasks => {
        this.tasks = tasks;
      });
    }
  }
  getTextFromEvent(event: Event): string {
    const target = event.target as HTMLElement | null;
    return target?.innerText ?? '';
  }

}
