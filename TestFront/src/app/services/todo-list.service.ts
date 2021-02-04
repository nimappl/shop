import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoItem } from '../models/todo-item';

@Injectable({ providedIn: 'root' })
export class TodoListService {
  apiUri = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<TodoItem[]>(`${this.apiUri}/todo`);
  }

  create(todoItem: TodoItem) {
    return this.http.post(`${this.apiUri}/todo`, todoItem, { observe: 'response'});
  }

  update(todoItem: TodoItem) {
    return this.http.put(`${this.apiUri}/todo/${todoItem.id}`, todoItem, { observe: 'response'});
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUri}/todo/${id}`);
  }
}
