import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';

import swal from "sweetalert";
import { Product } from '../models/product';
import { ProductService } from "../services/product.service";
import { Filter } from "../models/filter";
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  // products: Product[] = [
  //   {name: 'اچ تی سی 10', brand: 'HTC', price: 1500000, category: 'تلفن همراه', stock: 5, active: false},
  //   {name: 'iPhone X', brand: 'Apple', price: 21000000, category: 'تلفن همراه', stock: 24, active: true},
  //   {name: 'تی شرت مردانه (مشکی)', brand: 'LC WAIKIKI', price: 85000, category: 'لباس مردانه', stock: 13, active: true}
  // ];
  products: Product[] = [];

  columns = [
    {name: 'name', title: 'نام'},
    {name: 'brand', title: 'برند '},
    {name: 'price', title: 'قیمت'},
    {name: 'stock', title: 'موجود'},
    {name: 'category', title: 'دسته بندی'}
  ];

  sortOptions = [
    {name: 'id', sort: 'none'},
    {name: 'name', sort: 'asc'},
    {name: 'brand', sort: 'none'},
    {name: 'price', sort: 'none'},
    {name: 'stock', sort: 'none'},
    {name: 'category', sort: 'none'}
  ];

  showSearchField = false;
  loading = false;
  loadingFailed = false;
  searchFormStatus = 'clean';

  activeDeactive: boolean = true;

  constructor(private dialog: MatDialog,
              private productSrv: ProductService,
              private catSrv: CategoryService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.productSrv.get().subscribe(res => {
      this.products = res;
      this.loading = false;
      this.products.forEach(p => {
        this.catSrv.getById(p.categoryId).subscribe(cat => {
          p.category = cat.name;
        });
      });
    }, err => {
      this.loading = false;
      this.loadingFailed = true;
    });
  }

  openModal(edit?: Product) {
    let data: Product;
    if (edit) data = edit; else data = new Product();

    const dialogRef = this.dialog.open(ProductsModalComponent, {
      width: '800px',
      direction: 'rtl',
      disableClose: true,
      data: data
    });

    dialogRef.afterClosed().subscribe(submitted => {
      if (submitted)
        this.fetch();
    });
  }

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search(filters: Filter[]) {}

  onRemoveProduct(index: number) {
    swal({
      title: 'حذف',
      text: `آیا از حذف ${this.products[index].name} اطمینان دارید؟`,
      icon: 'warning',
      buttons: ['بازگشت', 'ادامه'],
      dangerMode: true
    }).then(deleteConfirm => {
      if (deleteConfirm) {
        this.loading = true;
        this.productSrv.delete(this.products[index].id).subscribe(res => {
          this.loading = false;
          swal({title: 'موفق', text: `${this.products[index].name} با موفقیت حذف شد.`, icon: 'success'});
          this.fetch();
        }, err => {
          this.loading = false;
          swal({title: 'ناموفق', icon: 'error'});
        });
      }
    });
  }

  onActiveDeactive(index: number) {
    this.productSrv.update(this.products[index]).subscribe(res => {
      swal({title: 'موفق', text: `${this.products[index].name} با موفقیت بروز رسانی شد.`, icon: 'success'});
    }, err => {
      this.products[index].active = !this.products[index].active;
      swal({title: 'ناموفق', icon: 'error'});
    });
  }

  onSortChange(index: number) {}

}
