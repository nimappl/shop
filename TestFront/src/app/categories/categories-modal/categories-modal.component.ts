import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-categories-modal',
  templateUrl: './categories-modal.component.html',
  styleUrls: ['./categories-modal.component.css']
})
export class CategoriesModalComponent implements OnInit {
  mode: string;
  title: string;
  reachingOut = false;
  constructor(public dialogRef: MatDialogRef<CategoriesModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data,
              public catSrv: CategoryService) { }

  ngOnInit(): void {
    if (!this.data.name) this.data.name = '';
    this.mode = this.data.name.length > 0 ? 'edit' : 'new';
    this.title = this.mode === 'edit' ? 'ویرایش' : 'جدید';
  }

  save() {
    this.reachingOut = true;
    if (this.mode === 'new') {
      this.catSrv.create(this.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'موفق', text: 'اطلاعات با موفقیت ثبت شد', icon: 'success'});
      }, err => {
        this.reachingOut = false;
        swal({title: 'ناموفق', icon: 'error'});
      });
    } else {
      this.catSrv.update(this.data).subscribe(res => {
        this.reachingOut = false;
        swal({title: 'موفق', text: 'اطلاعات با موفقیت ثبت شد', icon: 'success'});
      }, err => {
        this.reachingOut = false;
        swal({title: 'ناموفق', icon: 'error'});
      });
    }
  }
  
}
