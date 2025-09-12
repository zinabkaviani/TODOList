import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks';

  constructor(private http: HttpClient) {}

  // Get tasks for a specific date
  getTasks(date: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?date=${date}`);
  }

  // Get all tasks for history
  getAllTasks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // Add a task for a specific date
  addTask(date: string, task: string): Observable<any> {
    return this.http.post(this.apiUrl, { date, task });
  }

  // Update a task (e.g., mark as completed or edit text)
  updateTask(date: string, id: number, text?: string, completed?: boolean): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, { date, text, completed });
  }

  // Delete a task
  deleteTask(date: string, id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, { body: { date } });
  }
}
