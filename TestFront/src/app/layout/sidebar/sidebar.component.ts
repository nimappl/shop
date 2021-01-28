import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  dropdownState = false;

  constructor() { }

  ngOnInit(): void { }
  
  dropdownToggle() {
    this.dropdownState = !this.dropdownState;
  }
}
