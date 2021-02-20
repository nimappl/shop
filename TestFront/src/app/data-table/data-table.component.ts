import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Filter } from '../models/filter';
import { GridData, sortType } from '../models/GridData';
import { PagingParams } from "../models/pagingParams";

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: GridData<any>;
  @Input() columns: Array<{name: string, title: string}>[];
  @Input() searchField: boolean;
  @Input() loading: boolean;
  @Input() loadingFailed: boolean;

  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() activeChanged = new EventEmitter();
  @Output() paramsChanged = new EventEmitter();

  pagingParams: PagingParams = new PagingParams();

  activeDeactive(): boolean {
    if (!this.loading && !this.loadingFailed) {
      if (this.data.data.length > 0 && this.data.data[0].hasOwnProperty('active'))
        return true;

      return false;
    }
  }

  ngOnInit(): void {
    this.pagingParams.pageSize = this.data.pageSize;
    this.pagingParams.currentPage = this.data.pageNumber;
    this.pagingParams.count = this.data.count;
  }

  toggleSortFor(column: string) {
    if (this.data.sortBy !== column) {
      this.data.sortType = sortType.Asc;
      this.data.sortBy = column;
    } else {
      if (this.data.sortType === sortType.Desc) {
        this.data.sortType = sortType.Asc;
      } else if (this.data.sortType === sortType.Asc) {
        this.data.sortType = sortType.Desc;
      }
    }

    this.paramsChanged.emit();
  }

  edit(index: number) {
    this.editItem.emit(this.data.data[index]);
  }

  remove(index: number) {
    this.removeItem.emit(index);
  }

  toggleActive(index: number) {
    this.activeChanged.emit(index);
  }

  recordFields(record: object) {
    const fields = []
    for (let field in record)
      if (field !== 'active' && !field.includes('id') && !field.includes('Id'))
        fields.push(record[field]);
    return fields;
  }

  search(column: string, value: string) {
    if (!this.data.filters) {
      this.data.filters = new Array<Filter>();
      this.data.filters.push(new Filter(column, value));
    } else {
      this.data.filters.forEach(filter => {
        if (filter.key === column) {
          filter.value = value;
        } else {
          this.data.filters.push(new Filter(column, value));
        }
      });
    }

    this.paramsChanged.emit();
  }

  pagingChanged() {
    this.paramsChanged.emit();
  }
}
