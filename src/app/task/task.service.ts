import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_ENDPOINT} from '../app.tokens';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Task} from './models/task';

interface TaskResponse {
  item: Task;
}

interface TasksResponse {
  items: Task[];
}

@Injectable()
export class TaskService {

  constructor(private http: HttpClient, @Inject(API_ENDPOINT) private apiEndpoint) {
  }

  getTask(id: string): Observable<Task> {
    return this.http.get<TaskResponse>(`${this.apiEndpoint}/tasks/${id}`)
      .pipe(map(data => data.item));
  }

  getTasks(): Observable<Array<Task>> {
    return this.http.get<TasksResponse>(`${this.apiEndpoint}/tasks`)
      .pipe(map(data => data.items));
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<TaskResponse>(`${this.apiEndpoint}/tasks/${task.id}`, task)
      .pipe(map(data => data.item));
  }
}
