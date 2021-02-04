import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CategoriesModalComponent } from './categories-modal/categories-modal.component';
import { CategoryService } from '../services/category.service';
import { Category } from "../models/category";

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
      this.categories.forEach(cat => {
        delete cat.product;
      });
    }, err => {
      this.loading = false;
      this.loadingFailed = true;
    });
  }

  openModal(edit?:number) {
    const dialogRef = this.dialog.open(CategoriesModalComponent, {
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

  onEditCategory(index: number) {}

  onRemoveCategory(index: number) {}

  onSortChange(index: number) {}

}
