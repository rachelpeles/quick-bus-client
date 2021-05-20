import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatSelectModule,
  MatOptionModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatStepperModule,
  MatFormFieldModule,
  MatRippleModule,
  MatSliderModule,
  MatPaginatorModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSortModule,
  MatGridListModule,
  MatSlideToggleModule,
  MatDialogModule
  // MatDialogModule
  //ErrorStateMatcher,
  //ShowOnDirtyErrorStateMatcher
} from '@angular/material';

import { AppComponent } from './app.component'
import { UpdateComponent } from './Components/update/update.component'
import { PassengersComponent } from './Components/passengers/passengers.component';
import { VehicleComponent } from './Components/vehicle/vehicle.component';
import { MyRoutingModule } from './my-routing/my-routing.module'
import { HomeComponent } from './Components/home/home.component';
import { AddPassengerComponent } from './Components/add-passenger/add-passenger.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { NewManagerComponent } from './Components/new-manager/new-manager.component';
import { AddChildComponent } from './Components/add-child/add-child.component'
import { MyGridComponent } from './Components/my-grid/my-grid.component';
import { RouterModule } from '@angular/router';
import { formatNumber } from '@angular/common';
import { UserMainComponent } from './Components/user-main/user-main.component';
import { EditDialogComponent } from './Components/edit-dialog/edit-dialog.component';
import { NewPassengerDialogComponent } from './Components/new-passenger-dialog/new-passenger-dialog.component';
// import { MsgDialogComponent } from './Components/msg-dialog/msg-dialog.component';

// import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';


@NgModule({
  entryComponents: [ NewPassengerDialogComponent ],
  declarations: [
    AppComponent,
    UpdateComponent,
    PassengersComponent,
    VehicleComponent,
    HomeComponent,
    AddPassengerComponent,
    NotFoundComponent,
    NewManagerComponent,
    AddChildComponent,
    MyGridComponent,
    UserMainComponent,
    EditDialogComponent,
    NewPassengerDialogComponent
    // AddVehicleComponent,
    // MsgDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    MyRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatInputModule,
    MatButtonModule,
    MatGridListModule,
    MatFormFieldModule,
    FormsModule,
    MatNativeDateModule,
    MatRippleModule,
    ReactiveFormsModule,
    MatRadioModule,
    HttpClientModule,
    MatTableModule,
    MatSlideToggleModule,
    MatDialogModule,
    //ErrorStateMatcher,
    //ShowOnDirtyErrorStateMatcher,
    MatMenuModule,
    MatCardModule,
    MatSortModule,
    MatToolbarModule,
    MatIconModule,
    MatDatepickerModule,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule,
    MatPaginatorModule,
    // MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


