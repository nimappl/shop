import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PagingParams } from 'src/app/models/pagingParams';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  @Input() pagingParams: PagingParams;
  @Output() pagingChanged = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
  }

}
