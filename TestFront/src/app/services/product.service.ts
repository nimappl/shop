import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Product } from "../models/product";
import { GridData } from '../models/GridData';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUri = "http://localhost:5000/api";

  constructor(private http: HttpClient) {}

  get() {
    return this.http.get<GridData<Product>>(`${this.apiUri}/product`);
  }

  create(product: Product) {
    return this.http.post(`${this.apiUri}/product`, product);
  }

  update(product: Product) {
    return this.http.put(`${this.apiUri}/product/${product.id}`, product);
  }

  delete(id: number) {
    return this.http.delete(`${this.apiUri}/product/${id}`);
  }

}
