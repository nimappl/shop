import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../../models/category';
import { CategoryService } from "../../services/category.service";
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import swal from 'sweetalert';
import { GridData } from 'src/app/models/GridData';

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
  loadingCategories = false;
  categories: GridData<Category>;

  @ViewChild('search') searchField: ElementRef;

  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private catSrv: CategoryService,
    private productSRv: ProductService
  ) {}

  ngOnInit(): void {
    this.mode = this.data.name === undefined ? 'new' : 'edit';
    this.title = this.mode === 'edit' ? 'ویرایش' : 'جدید';
    this.loadingCategories = true;
    this.catSrv.get().subscribe(res => {
      this.categories = res;
      this.loadingCategories = false;
    });
  }

  toggleCatSearch(open: boolean) {
    if (open)
      this.searchField.nativeElement.focus();
  }

  submit() {
    this.submitted = true;
    this.reachingOut = true;

    if (this.mode === 'new') {
      this.productSRv.create(this.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'موفق', text: `محصول جدید با موفقیت اضافه گردید`, icon: 'success'});
      }, err => {
        this.reachingOut = false;
        swal({title: 'ناموفق', icon: 'error'});
      });
    } else {
      this.productSRv.update(this.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'موفق', text: `تغییرات با موفقیت ثبت شد`, icon: 'success'});
      }, err => {
        this.reachingOut = false;
        swal({title: 'ناموفق', icon: 'error'});
      });
    }
  }
}
