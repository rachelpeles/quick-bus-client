import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Transportation } from 'src/app/Classes/transportation';

@Component({
  selector: 'app-del-trans-dialog',
  templateUrl: './del-trans-dialog.component.html',
  styleUrls: ['./del-trans-dialog.component.css']
})
@NgModule({
  imports: [MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule]
})
export class DelTransDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DelTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}


  ngOnInit() {
    console.log(this.data);
    console.log(this.data.description);
  }

  del() {
    alert('!ההסעה בוטלה! הודעה נשלחת לנוסעים');
  }

  cancel() {
    this.dialogRef.close();
  }
}