import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-products-modal',
  templateUrl: './products-modal.component.html',
  styleUrls: ['./products-modal.component.css']
})
export class ProductsModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void { }

}
