import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GridData } from 'src/app/models/GridData';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagingParams: GridData<any>;
  @Output() pagingChanged = new EventEmitter();
  numberOfPages: number;
  pages = [];
  lastItemInPage: number = 0;


  ngOnInit(): void {
    let pageNum = 1;
    for (let i = 0; i < this.pagingParams.count; i+=this.pagingParams.pageSize)
      this.pages.push(pageNum++);

    this.numberOfPages = this.pages.length;
    let items = this.pagingParams.pageNumber * this.pagingParams.pageSize
    if (items > this.pagingParams.count)
      this.lastItemInPage = this.pagingParams.count;
    else
      this.lastItemInPage = items;
  }

  changed() {
    this.pagingChanged.emit();
  }

  pageNumberChange(no: number) {
    if (no === 0) {
      this.pagingParams.pageNumber++;
    } else if (no === -1) {
      this.pagingParams.pageNumber--;
    } else {
      this.pagingParams.pageNumber = no;
    }

    this.pagingChanged.emit();
  }

}
