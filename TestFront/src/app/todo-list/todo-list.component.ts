import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/models/todo-item';
import { DialogData } from "./dialog-data";
import { TodoListService } from '../../services/todo-list.service';
import { TodoListModalComponent } from './todo-list-modal/todo-list-modal.component';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  todos: TodoItem[] = [];
  isFetching = false;

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
    });
  }

  openModal(index?: number) {
    let data: DialogData
    if (index)
      data.mode = "Edit";
    else
      data.mode = "New";
    data.data = this.todos[index];

    const dialogRef = this.dialog.open(TodoListModalComponent, {
      width: '700px',
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });

  }

  toggleTodoStatus(todo: TodoItem) {
    todo.isComplete = !todo.isComplete;
    this.todolistSrv.update(todo).subscribe();
    // this.fetchTodos();
  }

}
