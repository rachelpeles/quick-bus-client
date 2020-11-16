import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { ElementData } from '@angular/core/src/view';
import { VehiclesService } from 'src/app/Services/vehicles.service';
import { Vehicles } from 'src/app/Classes/vehicles';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { DelVehicleDialogComponent } from '../del-vehicle-dialog/del-vehicle-dialog.component';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit {
  //@ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  constructor(private httpSer: VehiclesService, private dialog: MatDialog) {

  }
  addVehicle: FormGroup;
  dataSource;
  vehicle: Vehicles[];
  // vehicle = ELEMENT_DATA;

  displayedColumns = ['vehiclesId', 'typeVhicles', 'amountPlaces', 'priceForKM', 'delete', 'edit']

  ngOnInit() {
    // this.vehicle = [
    //   { amountPlaces: 33333, priceForKM : 12, vehiclesId: 33, typeVhicles: 'ss' }
    // ];
    this.dataSource = new MatTableDataSource<Vehicles>(this.vehicle);

    this.httpSer.getAllVehicles().subscribe((data) => {
      console.log("getAllVehicles data:")
      console.log(data);
      this.vehicle = data;
      this.dataSource = new MatTableDataSource<Vehicles>(data);
      //this.table.renderRows();
    },
      (err) => {
        alert(console.log(err));
      }
    );
  }

  action(actionType, thisVehicle): void {

    if (actionType == 'edit' || actionType == 'add') {
      const dialogRef = this.dialog.open(EditDialogComponent,
        {
          width: '250px',
          data: { actionType: actionType, thisVehicle: thisVehicle }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.vehicle = result;
      });
    }

    else if (actionType == 'delete') {
      const dialogRef = this.dialog.open(DelVehicleDialogComponent,
        {
          width: '250px',
          data: { thisVehicle: thisVehicle }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.vehicle = result;
      });
    }
  }
}
