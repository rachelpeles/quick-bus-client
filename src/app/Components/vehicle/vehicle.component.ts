import { Component, OnInit } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
//import { ElementData } from '@angular/core/src/view';
import { VehiclesService } from 'src/app/Services/vehicles.service';
import { Vehicles } from 'src/app/Classes/vehicles';
import { ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})

export class VehicleComponent implements OnInit {
  //@ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor(private httpSer: VehiclesService) {

  }
  addVehicle: FormGroup;
  dataSource;
  vehicle: Vehicles[];
  // vehicle = ELEMENT_DATA;

  displayedColumns = ['vehicleId', 'vehicleType', 'amountPlaces', 'price']

  ngOnInit() {
    this.vehicle = [
      { amountPlaces: 33333, price: 12, vehicleId: 33, vehicleType: 'ss' }
    ];
    this.dataSource = new MatTableDataSource<Vehicles>(this.vehicle);

    this.httpSer.getAllVehicles().subscribe((data) => {
      console.log("getAllVehicles data:")
      console.log(data);
      this.vehicle = data;
      this.dataSource = new MatTableDataSource<Vehicles>(this.vehicle);
      //this.table.renderRows();
    },
      (err) => {
        alert(console.log(err));
      }
    );
  }

  selection = new SelectionModel<Vehicles>(true, []);
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Vehicles): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.vehicleId + 1}`;
  }

  add() {
    this.httpSer.add(this.addVehicle);
  }
  update() {
    this.httpSer.update(this.addVehicle);
  }
  delete() {
    this.dataSource.data.forEach(this.httpSer.del(this.dataSource.data.vehicleId));
  }
}
