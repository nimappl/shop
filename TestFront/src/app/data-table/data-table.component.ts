import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {
  @Input() records: any[];
  @Input() fieldNames: string[];
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
    if (this.records.length > 0 && this.records[0].hasOwnProperty('active'))
      return true;

    return false;
  }

  ngOnInit(): void {}

  toggleSearch() {
    this.searchField = !this.searchField;
  }

  toggleSortFor(index: number) {
    if (this.sortOptions[index].sort === 'none') {
      this.sortOptions[index].sort = 'asc';
    } else if (this.sortOptions[index].sort === 'desc') {
      this.sortOptions[index].sort = 'none';
    } else if (this.sortOptions[index].sort === 'asc') {
      this.sortOptions[index].sort = 'desc';
    }

    this.sortChanged.emit(this.sortOptions);
  }

  edit(index: number) {
    this.editItem.emit(this.records[index]);
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
