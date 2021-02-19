import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { CategoryService } from '../services/category.service';
import { Category } from "../models/category";
import { Filter } from "../models/filter";
import { GridData, sortType } from "../models/GridData";
import swal from 'sweetalert';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: GridData<Category> = new GridData<Category>();

  columns = [{name: 'name', title: 'نام'}];

  sortOptions = [
    {name: 'id', sort: 'asc'},
    {name: 'name', sort: 'asc'}
  ];

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

  fetch(options?: GridData<Category>) {
    this.loading = true;
    this.catSrv.get(options).subscribe(res => {
      this.loading = false;
      this.categories = res;
      // this.categories.filters.push(new Filter('name', ''));
      this.categories.sortBy = 'name';
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

  onRemoveCategory(index: number) {
    swal({
      title: 'حذف',
      text: `دسته بندی ${this.categories.data[index].name} حذف خواهد شد`,
      icon: 'warning',
      buttons: ['بازگشت', 'ادامه'],
      dangerMode: true
    }).then(deleteConfirm => {
      if (deleteConfirm) {
        this.loading = true;
        this.catSrv.delete(this.categories.data[index].id).subscribe(res => {
          this.loading = false;
          swal({title: 'موفق', text: `دسته بندی ${this.categories.data[index].name} با موفقیت حذف شد.`, icon: 'success'});
          this.fetch();
        }, err => {
          this.loading = false;
          swal({title: 'ناموفق', icon: 'error'});
        });
      }
    });
  }

  onToggleStatus(index: number) {
    this.catSrv.update(this.categories.data[index]).subscribe(res => {
      swal({title: 'موفق', text: `دسته بندی ${this.categories.data[index].name} با موفقیت بروز رسانی شد.`, icon: 'success'});
    }, err => {
      this.categories.data[index].active = !this.categories.data[index].active;
      swal({title: 'ناموفق', icon: 'error'});
    });
  }

  onSortChange(index: number) {}

}
