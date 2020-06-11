import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes ,RouterModule} from '@angular/router';
import { HomeComponent } from '../Components/home/home.component';
import { AddPassengerComponent } from '../Components/add-passenger/add-passenger.component';
import { UpdateComponent } from '../Components/update/update.component';
import { VehicleComponent } from '../Components/vehicle/vehicle.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { NewManagerComponent } from '../Components/new-manager/new-manager.component';

const appRout:Routes=
[
  {path: "", component: HomeComponent},
  {path: "AddPassenger", component: AddPassengerComponent },
  { path: 'update-component', component: UpdateComponent },
  { path: 'vehicle-componen', component: VehicleComponent },
  { path: "NotFound", component: NotFoundComponent },
  {path: "NewManager", component: NewManagerComponent},
  {path:"**", redirectTo:"/NotFound"} 
  
]; 

@NgModule({
  declarations: [],
  imports: [
    CommonModule,RouterModule.forRoot(appRout)
  ]
})
export class MyRoutingModule { }
