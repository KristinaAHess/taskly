import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../app.tokens';
import { Observable } from 'rxjs';
import { Task } from './models/task';

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<Task>(`${this.apiEndpoint}/tasks/${id}`);
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<Task[]>(`${this.apiEndpoint}/tasks`);
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiEndpoint}/tasks/${task.id}`, task);
  }

  removeTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiEndpoint}/tasks/${id}`);
  }
}
