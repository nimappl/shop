import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  apiUri = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<Category[]>(`${this.apiUri}/category`);
  }

  create(category: Category) {
    return this.http.post(`${this.apiUri}/category`, category);
  }

  update(category: Category) {
    return this.http.put(`${this.apiUri}/category/${category.id}`, category);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUri}/category/${id}`);
  }
}
