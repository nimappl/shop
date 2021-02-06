import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TodoItem } from 'src/app/models/todo-item';
import { TodoListService } from '../services/todo-list.service';
import { TodoListModalComponent } from './todo-list-modal/todo-list-modal.component';
import swal from 'sweetalert';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  isFetching = false;
  fetchingFailed = false;

  constructor(private todolistSrv: TodoListService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.fetchTodos();
  }

  fetchTodos() {
    this.isFetching = true;
    this.todolistSrv.get().subscribe(items => {
      this.todos = items;
      this.isFetching = false;
    }, error => {
      this.isFetching = false;
      this.fetchingFailed = true;
    });
  }

  openModal(todoItem?: TodoItem) {
    let mode: string;
    if (!todoItem) {
      todoItem = new TodoItem();
      mode = 'new';
    } else {
      mode = 'edit';
    }
    const dialogRef = this.dialog.open(TodoListModalComponent, {
      width: '700px',
      data: {mode: mode, data: todoItem}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchTodos();
    });
  }

  toggleTodoStatus(todo: TodoItem) {
    todo.isComplete = !todo.isComplete;
    this.isFetching = true;
    this.todolistSrv.update(todo).subscribe(res => {
      if (!res.ok) {
        todo.isComplete = !todo.isComplete;
      }
      this.isFetching = false;
    });
  }

  deleteTodo(id: number) {
    swal({
      title: 'Delete Item',
      text: '?Are you sure you want to delete this Item',
      icon: 'warning',
      buttons: ['No', 'Yes'],
      dangerMode: true
    }).then(deleteConfirm => {
      if (deleteConfirm)
        this.todolistSrv.delete(id).subscribe(res => {
          this.fetchTodos();
        });
    });
  }

}
