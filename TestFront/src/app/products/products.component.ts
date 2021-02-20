import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';

import swal from "sweetalert";
import { Product } from '../models/product';
import { ProductService } from "../services/product.service";
import { Filter } from "../models/filter";
import { CategoryService } from '../services/category.service';
import { GridData } from '../models/GridData';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: GridData<Product> = new GridData<Product>();

  columns = [
    {name: 'name', title: 'نام'},
    {name: 'brand', title: 'برند '},
    {name: 'price', title: 'قیمت'},
    {name: 'categoryName', title: 'دسته بندی'},
    {name: 'stock', title: 'موجود'}
  ];

  sortOptions = [
    {name: 'id', sort: 'none'},
    {name: 'name', sort: 'asc'},
    {name: 'brand', sort: 'none'},
    {name: 'price', sort: 'none'},
    {name: 'categoryName', sort: 'none'},
    {name: 'stock', sort: 'none'}
  ];

  showSearchField = false;
  loading = false;
  loadingFailed = false;
  searchFormStatus = 'clean';

  activeDeactive: boolean = true;

  constructor(private dialog: MatDialog,
              private productSrv: ProductService) {}

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.productSrv.get().subscribe(res => {
      this.products = res;
      this.products.sortBy = 'name';
      this.loading = false;
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

  onRemoveProduct(index: number) {
    swal({
      title: 'حذف',
      text: `آیا از حذف ${this.products.data[index].name} اطمینان دارید؟`,
      icon: 'warning',
      buttons: ['بازگشت', 'ادامه'],
      dangerMode: true
    }).then(deleteConfirm => {
      if (deleteConfirm) {
        this.loading = true;
        this.productSrv.delete(this.products.data[index].id).subscribe(res => {
          this.loading = false;
          swal({title: 'موفق', text: `${this.products.data[index].name} با موفقیت حذف شد.`, icon: 'success'});
          this.fetch();
        }, err => {
          this.loading = false;
          swal({title: 'ناموفق', icon: 'error'});
        });
      }
    });
  }

  onActiveDeactive(index: number) {
    this.productSrv.update(this.products.data[index]).subscribe(res => {
      swal({title: 'موفق', text: `${this.products.data[index].name} با موفقیت بروز رسانی شد.`, icon: 'success'});
    }, err => {
      this.products[index].active = !this.products.data[index].active;
      swal({title: 'ناموفق', icon: 'error'});
    });
  }

  paramsChanged() {}

}
