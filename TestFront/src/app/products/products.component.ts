import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
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
    {name: 'تی شرت مردانه (مشکی)', brand: 'LC WAIKIKI', category: 'لباس مردانه', price: 85000, stock: 13, active: true}
  ];
  filters = [
    {name: 'none'},
    {brand: 'none'},
    {price: 'none'},
    {category: 'none'},
    {stock: 'none'}
  ];

  shiftFilter(current: string) {
    const types = ['none', 'asc', 'desc'];
    if (current === 'none') return types[1];
    if (current === 'asc') return types[2];
    if (current === 'desc') return types[0];
  }

  showSearchField = false;
  loading = false;

  activeDeactive: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

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

  toggleSortFor(item: string) {
    this.filters.forEach(x => {
      if (x.hasOwnProperty(item))
        x[item] = this.shiftFilter(x[item]);
    });
  }

}
