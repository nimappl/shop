import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { NavigationEnd, Router } from '@angular/router';
import { filter } from "rxjs/internal/operators";

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
    this.router.events.pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        if (e.urlAfterRedirects === '/products' || e.urlAfterRedirects === '/categories')
        this.warehouseDrpState = true;
      else
        this.warehouseDrpState = false;
      });
  }

  dropdownToggle() {
    this.warehouseDrpState = !this.warehouseDrpState;
  }
}
