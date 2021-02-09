import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit {
  title: string;
  mode: string;
  reachingOut = false;
  submitted = false;
  
  categories = [
    { name: 'تلفن همراه', id: 1 },
    { name: 'لباس مردانه', id: 2 },
    { name: 'قطعات کامپیوتر', id: 3 }
  ];

  @ViewChild('search') searchField: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product
  ) {}

  ngOnInit(): void {
    this.mode = this.data.name === undefined ? 'edit' : 'new';
    this.title = this.mode === 'edit' ? 'ویرایش' : 'جدید';
  }

  toggleCatSearch(open: boolean) {
    if (open)
      this.searchField.nativeElement.focus();
  }

  submit() {
    this.submitted = true;
  }

}
