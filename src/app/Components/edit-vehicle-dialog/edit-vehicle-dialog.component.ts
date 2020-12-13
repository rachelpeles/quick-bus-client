import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog, MatDialogConfig } from '@angular/material';
import { Vehicles } from 'src/app/Classes/vehicles';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-vehicle-dialog.component.html',
  styleUrls: ['./edit-vehicle-dialog.component.css']
})
@NgModule({
  imports: [MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule]
})
export class EditVehicleDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditVehicleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Vehicles) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data);
    console.log(this.data.typeVhicles);
  }

  cancel()
  {
    this.dialogRef.close();
  }

  // save()
  // {
  //   // return this.data;
  //   this.dialogRef.close();
  //   return this.data;
  // }
}