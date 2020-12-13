import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { AddPassengerComponent } from '../Components/add-passenger/add-passenger.component';
import { UpdateComponent } from '../Components/update/update.component';
import { VehicleComponent } from '../Components/vehicle/vehicle.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { NewManagerComponent } from '../Components/new-manager/new-manager.component';
import { AddChildComponent } from '../Components/add-child/add-child.component';
import { MyGridComponent } from '../Components/my-grid/my-grid.component';
import { PassengersComponent } from '../Components/passengers/passengers.component';
import { UserMainComponent } from '../Components/user-main/user-main.component';
import { EditVehicleDialogComponent } from '../Components/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { JoinToTransportComponent } from '../Components/join-to-transport/join-to-transport.component';
import { MyCreateTransportationComponent } from '../Components/my-create-transportation/my-create-transportation.component';
import { DelTransDialogComponent } from '../Components/del-trans-dialog/del-trans-dialog.component';
import { EditTransDialogComponent } from '../Components/edit-trans-dialog/edit-trans-dialog.component';
import { WaiteConfirmComponent } from '../Components/waite-confirm/waite-confirm.component';

const appRout: Routes =
  [
    { path: '', redirectTo: 'Home', pathMatch: "full" },
    { path: "", component: HomeComponent },
    { path: "Home", component: HomeComponent },
    // {path: "MyTable", component: MyTableComponent},
    { path: "AddPassenger", component: AddPassengerComponent },
    { path: "update", component: UpdateComponent },
    { path: "vehicle", component: VehicleComponent },
    { path: "AddChild", component: AddChildComponent },
    { path: "NotFound", component: NotFoundComponent },
    { path: "NewManager", component: NewManagerComponent },
    { path: "MyGridComponent", component: MyGridComponent },
    { path: "PassengersComponent", component: PassengersComponent },
    { path: "UserMain", component: UserMainComponent },
    { path: "EditVehicleDialog", component: EditVehicleDialogComponent },
    { path: "JoinToTransport", component: JoinToTransportComponent },
    { path: "MyCreateTransportation", component: MyCreateTransportationComponent },
    { path: "DelTransDialog", component: DelTransDialogComponent },
    { path: "EditTransDialog", component: EditTransDialogComponent },
    { path: "WaiteConfirm", component: WaiteConfirmComponent },
    { path: "**", redirectTo: "/NotFound" }

  ];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, RouterModule.forRoot(appRout)
  ]
})
export class MyRoutingModule { }
