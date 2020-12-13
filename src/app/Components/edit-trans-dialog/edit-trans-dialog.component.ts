import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-trans-dialog',
  templateUrl: './edit-trans-dialog.component.html',
  styleUrls: ['./edit-trans-dialog.component.css']
})
export class EditTransDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
