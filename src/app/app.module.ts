import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule, MatFormFieldModule, MatRippleModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material';
import { MatStepperModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule , MatOptionModule} from '@angular/material';

import { AppComponent } from './app.component'
import { UpdateComponent } from './Components/update/update.component'
import { PassengersComponent } from './Components/passengers/passengers.component';
import { VehicleComponent } from './Components/vehicle/vehicle.component';
import { MyRoutingModule } from './my-routing/my-routing.module'
import { HomeComponent } from './Components/home/home.component';
import { AddPassengerComponent } from './Components/add-passenger/add-passenger.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { MyTableComponent } from './Components/my-table/my-table.component'
import { NewManagerComponent } from './Components/new-manager/new-manager.component'


@NgModule({
  declarations: [
    AppComponent,
    UpdateComponent,
    PassengersComponent,
    VehicleComponent,
    HomeComponent,
    AddPassengerComponent,
    NotFoundComponent,
    MyTableComponent,
    NewManagerComponent,
    
  ],
  imports: [
    BrowserModule,
    MyRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatRippleModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    //NoopAnimationsModule ,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule

  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


