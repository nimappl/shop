import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { MatDialog } from '@angular/material/dialog';
import { ProductsModalComponent } from './products-modal/products-modal.component';

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

  openModal(edit?:number) {
    const dialogRef = this.dialog.open(ProductsModalComponent, {
      width: '650px',
      data: 'pox'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('dialog closed');
    });
  }

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search() {}
  
  onRemoveProduct(index: number) {}

  onActiveDeactive(index: number) {}

  onSortChange(index: number) {}

}
