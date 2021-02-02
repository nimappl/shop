import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TodoItem } from 'src/app/models/todo-item';
import swal from 'sweetalert';
import { TodoListService } from "../../services/todo-list.service";

@Component({
  selector: 'app-todo-list-modal',
  templateUrl: './todo-list-modal.component.html',
  styleUrls: ['./todo-list-modal.component.css']
})
export class TodoListModalComponent implements OnInit {
  submit: string;
  title: string;
  reachingOut = false;

  constructor(
    public dialogRef: MatDialogRef<TodoListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    public todolistSrv: TodoListService
  ) {}

  ngOnInit() {
    this.submit = this.data.mode === 'new' ? 'Save' : 'Update';
    this.title = this.data.mode === 'new' ? 'New' : 'Edit';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSave() {
    this.reachingOut = true;
    if (this.data.mode === 'new') {
      this.todolistSrv.create(this.data.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'Done', text: 'Item successfully created', icon: 'success'});
      }, error => {
        console.log(error)
        this.reachingOut = false;
        swal({title: 'Error', text: 'There was an error', icon: 'error'});
      });
    } else {
      this.todolistSrv.update(this.data.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'Done', text: 'Item successfully updated', icon: 'success'});
      }, error => {
        this.reachingOut = false;
        swal({title: 'Error', text: 'There was an error', icon: 'error'});
      });
    }
  }
}
