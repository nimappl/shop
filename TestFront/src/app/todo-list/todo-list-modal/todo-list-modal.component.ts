import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/models/todo-item';

@Component({
  selector: 'app-todo-list-modal',
  templateUrl: './todo-list-modal.component.html',
  styleUrls: ['./todo-list-modal.component.css']
})
export class TodoListModalComponent {

  constructor(
    public dialogRef: MatDialogRef<TodoListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TodoItem
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
