import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';
import { Filter } from "../models/filter";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: Product[] = [
    {name: 'اچ تی سی 10', brand: 'HTC', price: 1500000, category: 'گوشی موبایل', stock: 5, active: false},
    {name: 'iPhone X', brand: 'Apple', price: 21000000, category: 'گوشی موبایل', stock: 24, active: true},
    {name: 'تی شرت مردانه (مشکی)', brand: 'LC WAIKIKI', price: 85000, category: 'لباس مردانه', stock: 13, active: true}
  ];

  fields = [
    'نام',
    'برند',
    'قیمت (تومان)',
    'دسته بندی',
    'موجود'
  ];

  sortOptions = [
    {name: 'name', sort: 'asc'},
    {name: 'brand', sort: 'none'},
    {name: 'price', sort: 'none'},
    {name: 'category', sort: 'none'},
    {name: 'stock', sort: 'none'}
  ];

  showSearchField = false;
  loading = false;
  loadingFailed = false;
  searchFormStatus = 'clean';

  activeDeactive: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {}

  openModal(edit?: Product) {
    let data: Product;
    if (edit) data = edit; else data = new Product();

    const dialogRef = this.dialog.open(ProductsModalComponent, {
      width: '800px',
      direction: 'rtl',
      data: data
    });

    dialogRef.afterClosed().subscribe(submitted => {
      if (submitted)
        console.log('form was submitted');
      else
        console.log('form was not submitted');
    });
  }

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search(filters: Filter[]) {}
  
  onRemoveProduct(index: number) {}

  onActiveDeactive(index: number) {}

  onSortChange(index: number) {}

}
