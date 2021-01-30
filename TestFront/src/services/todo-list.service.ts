import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../models/todo-item';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  apiUri = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TodoItem[]>(`${this.apiUri}/todolist`);
  }

  create(todoItem: TodoItem) {
    this.http.post(`${this.apiUri}/todolist`, todoItem);
  }

  update(todoItem: TodoItem) {
    return this.http.put(`${this.apiUri}/todolist/${todoItem.id}`, todoItem);
  }

}
