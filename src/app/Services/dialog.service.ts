import { Injectable } from '@angular/core';
// import { AddVehicleComponent } from '../Components/add-vehicle/add-vehicle.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    // public dialog: MatDialog, public httpser: VehiclesService
  ) { }

  addV()
  {
    // const dialogAdd=this.dialog.open(AddVehicleComponent,
    // {
    //   panelClass: 'msg-dialog',
    //   width: '290px',
    //   height: '225px',
    //   // data:{AddVehicleComponent}
    // });
    // dialogAdd.afterClosed().subscribe(result => {
    //   if (result) {
    //     this.httpser.add()
    //   }
    // });
  }
}
