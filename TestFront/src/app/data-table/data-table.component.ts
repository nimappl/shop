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

  activeDeactive: boolean = true;

  ngOnInit(): void {
    if (this.records.length > 0)
      if (this.records[0].hasOwnProperty('active'))
        this.activeDeactive = true;
      else
        this.activeDeactive = false;
  }

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
    this.removeItem.emit(this.records[index]);
  }

  toggleActive(index: number) {
    this.activeChanged.emit(index);
  }

  recordFields(record: object) {
    const fields = []
    for (let field in record)
      if (field !== 'active' && field !== 'id')
        fields.push(record[field]);
    return fields;
  }
}
