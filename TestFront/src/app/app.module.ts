import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { PaginationComponent } from './pagination/pagination.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoListModalComponent } from './todo-list/todo-list-modal/todo-list-modal.component';

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
    TodoListModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
