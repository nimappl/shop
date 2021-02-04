import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from "@angular/material/input";

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsComponent } from './products/products.component';
import { CategoriesComponent } from './categories/categories.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsModalComponent } from './products/products-modal/products-modal.component';
import { CategoriesModalComponent } from './categories/categories-modal/categories-modal.component';
import { PaginationComponent } from './data-table/pagination/pagination.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListModalComponent } from './todo-list/todo-list-modal/todo-list-modal.component';
import { DataTableComponent } from './data-table/data-table.component';
import { LoadingSpinnerBarsComponent } from './shared/loading-spinner-bars/loading-spinner-bars.component'

@NgModule({
  declarations: [	
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    ProductsComponent,
    CategoriesComponent,
    OrdersComponent,
    ProductsModalComponent,
    CategoriesModalComponent,
    PaginationComponent,
    TodoListComponent,
    TodoListModalComponent,
    DataTableComponent,
    LoadingSpinnerBarsComponent
   ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
