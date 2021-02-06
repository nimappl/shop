import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  warehouseDrpState: boolean;

  constructor(private location: Location,
              private router: Router) {}

  ngOnInit(): void {
    if (location.pathname === '/products' || location.pathname === '/categories') {
      this.warehouseDrpState = true;
    } else {
      this.warehouseDrpState = false;
    }
  }

  dropdownToggle() {
    this.warehouseDrpState = !this.warehouseDrpState;
  }
}
