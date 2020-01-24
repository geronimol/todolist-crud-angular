import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  tasks: Task[] = [];
  readonly URL_API = 'http://localhost:3000/api';
  // readonly URL_API = 'https://todolist-webgero.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  getTasks() {
    return this.http.get(this.URL_API);
  }

  addTask(task: Task) {
    return this.http.post(this.URL_API, task);
  }

  updateTask(task: Task) {
    return this.http.put(this.URL_API + `/${task._id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(this.URL_API + `/${id}`);
  }
}
