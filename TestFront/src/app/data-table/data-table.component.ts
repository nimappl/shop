import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Category } from '../models/category';
import { GridData } from '../models/GridData';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() data: any;
  @Input() columns: any[];
  @Input() sortOptions: any[];
  @Input() searchField: boolean;
  @Input() loading: boolean;
  @Input() loadingFailed: boolean;

  @Output() editItem = new EventEmitter();
  @Output() removeItem = new EventEmitter();
  @Output() activeChanged = new EventEmitter();
  @Output() sortChanged = new EventEmitter();
  @Output() filtersChanged = new EventEmitter();

  activeDeactive(): boolean {
    if (!this.loading && !this.loadingFailed) {
      if (this.data.data.length > 0 && this.data.data[0].hasOwnProperty('active'))
        return true;
      
      return false;
    }
  }

  ngOnInit(): void {}

  toggleSearch() {
    this.searchField = !this.searchField;
  }

  toggleSortFor(column: string) {
    this.sortOptions.forEach(thing => {
      if (thing.name === column) {
        if (thing.sort === 'none') {
        thing.sort = 'asc';
        } else if (thing.sort === 'desc') {
          thing.sort = 'none';
        } else if (thing.sort === 'asc') {
          thing.sort = 'desc';
        }
      }
    });

    this.sortChanged.emit(this.sortOptions);
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
}
