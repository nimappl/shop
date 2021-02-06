import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { CategoryService } from '../services/category.service';
import { Category } from "../models/category";
import { Filter } from "../models/filter";
import swal from 'sweetalert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category[] = [];

  fields = ['نام'];

  sortOptions = [{name: 'name', sort: 'none'}];

  showSearchField = false;
  loading = false;
  loadingFailed = false;
  searchFormStatus = 'clean';

  activeDeactive: boolean = true;

  constructor(private dialog: MatDialog,
              private catSrv: CategoryService) { }

  ngOnInit(): void {
    this.fetch();
  }

  fetch() {
    this.loading = true;
    this.catSrv.get().subscribe(res => {
      this.loading = false;
      this.categories = res;
    }, err => {
      this.loading = false;
      this.loadingFailed = true;
    });
  }

  openModal(edit?: Category) {
    let data: Category;
    if (edit) data = edit; else data = new Category();

    const dialogRef = this.dialog.open(CategoriesModalComponent, {
      width: '650px',
      direction: 'rtl',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetch();
    });
  }

  toggleSearch() {
    this.showSearchField = !this.showSearchField;
  }

  search(filters: Filter[]) {}

  onRemoveCategory(index: number) {
    swal({
      title: 'حذف',
      text: `دسته بندی ${this.categories[index].name} حذف خواهد شد`,
      icon: 'warning',
      buttons: ['بازگشت', 'ادامه'],
      dangerMode: true
    }).then(deleteConfirm => {
      if (deleteConfirm) {
        this.loading = true;
        this.catSrv.delete(this.categories[index].id).subscribe(res => {
          this.loading = false;
          swal({title: 'موفق', text: `دسته بندی ${this.categories[index].name} با موفقیت حذف شد.`, icon: 'success'});
          this.fetch();
        }, err => {
          this.loading = false;
          swal({title: 'ناموفق', icon: 'error'});
        });
      }
    });
  }

  onToggleStatus(index: number) {
    this.catSrv.update(this.categories[index]).subscribe(res => {
      swal({title: 'موفق', text: `دسته بندی ${this.categories[index].name} با موفقیت بروز رسانی شد.`, icon: 'success'});
      console.log(this.categories[index]);
    }, err => {
      this.categories[index].active = !this.categories[index].active;
      swal({title: 'ناموفق', icon: 'error'});
      console.log(err);
    });
  }

  onSortChange(index: number) {}

}
