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
  MatSidenavModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatSnackBarModule,
  MatTooltipModule
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
import { EditVehicleDialogComponent } from './Components/edit-vehicle-dialog/edit-vehicle-dialog.component';
import { DelVehicleDialogComponent } from './Components/del-vehicle-dialog/del-vehicle-dialog.component';
import { JoinToTransportComponent } from './Components/join-to-transport/join-to-transport.component';
import { MyCreateTransportationComponent } from './Components/my-create-transportation/my-create-transportation.component';
import { EditTransDialogComponent } from './Components/edit-trans-dialog/edit-trans-dialog.component';
import { DelTransDialogComponent } from './Components/del-trans-dialog/del-trans-dialog.component';
import { WaiteConfirmComponent } from './Components/waite-confirm/waite-confirm.component';
import { ShowAndCalcComponent } from './Components/show-and-calc/show-and-calc.component';
import { CalcRoutComponent } from './Components/calc-rout/calc-rout.component';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
// import { AgmDirectionModule } from 'agm-direction';
// import { MsgDialogComponent } from './Components/msg-dialog/msg-dialog.component';

// import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';


@NgModule({
  // entryComponents: [ MsgDialogComponent ],
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
    EditVehicleDialogComponent,
    DelVehicleDialogComponent,
    JoinToTransportComponent,
    MyCreateTransportationComponent,
    EditTransDialogComponent,
    DelTransDialogComponent,
    WaiteConfirmComponent,
    ShowAndCalcComponent,
    CalcRoutComponent
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
    MatSidenavModule,
    MatCheckboxModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXS8o9R2xBXjDX-_7SGv3xqE8ET_413wg',
      libraries: ['places'],
      language: 'iw'
    }),
    AgmDirectionModule,
    MatGoogleMapsAutocompleteModule,
    // MatDialogModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


