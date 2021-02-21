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
    {name: 'Name', title: 'نام'},
    {name: 'Brand', title: 'برند '},
    {name: 'Price', title: 'قیمت'},
    {name: 'CategoryName', title: 'دسته بندی'},
    {name: 'Stock', title: 'موجود'}
  ];

  showSearchField = false;
  loading = false;
  sorting = false;
  loadingFailed = false;
  searchFormStatus = 'clean';

  activeDeactive: boolean = true;

  constructor(private dialog: MatDialog,
              private productSrv: ProductService) {}

  ngOnInit(): void {
    this.fetch(true);
  }

  fetch(tableLoading = false) {
    let pox  = new GridData<Product>();
    pox.filters = this.products.filters;
    pox.pageNumber = this.products.pageNumber;
    pox.pageSize = this.products.pageSize;
    pox.sortBy = this.products.sortBy;
    pox.sortType = this.products.sortType;
    this.loading = true;
    this.sorting = tableLoading;
    this.productSrv.get(pox).subscribe(res => {
      this.loading = false;
      this.sorting = false;
      this.products = res;
    }, err => {
      this.loading = false;
      this.sorting = false;
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

  paramsChanged() {
    this.fetch();
  }

}
