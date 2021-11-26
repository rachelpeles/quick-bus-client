// import { state } from '@angular/animations';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { stat } from 'fs';
import { Key } from 'protractor';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { UsersAddress } from 'src/app/Classes/users-address';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { TransportationService, wait } from 'src/app/Services/transportation.service';
/// <reference types="@types/googlemaps" />
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgForm } from '@angular/forms/forms';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-to-transport',
  templateUrl: './join-to-transport.component.html',
  styleUrls: ['./join-to-transport.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class JoinToTransportComponent implements OnInit {

  // joinTransport: FormGroup;
  // transportationList: Array<Transportation> = [];

  // constructor(private fb: FormBuilder, private transportSer: TransportationService) {
  //   this.joinTransport = fb.group({
  //     'transportationId': [null, this.chek, Validators.required],
  //     'address': [null, Validators.required]
  //   });
  // }

  // ngOnInit() {
  //   this.transportSer.getAllPassengertransport().subscribe(
  //     data => {
  //       this.transportationList = data;
  //     },
  //     error => {
  //       alert(error.massege);
  //     }
  //   );
  // }

  // chek() {
  //   let flag = false;

  //   for (var i = 0; i < this.transportationList.length && !flag; i++) {
  //     if (this.transportationList[i].transportationId == this.joinTransport.get('transportationId').value)
  //       flag = true;
  //   }
  //   return flag;
  // }

  joinTransport: FormGroup;
  transportationList: Array<Transportation> = [];
  thisTransportation: Transportation;
  thisUser: Family;
  countAddressUser: number;
  card1 = true;
  card2 = false;
  newDefault = false;
  trans: Transportation;
  newWait: UsersAddress;

  constructor(private transSer: TransportationService, private fb: FormBuilder, private userSer: FamilyService, private snackBar: MatSnackBar, private titleService: Title, private router: Router) {

    // this.thisUser=this.meSer.family;
    this.thisUser = JSON.parse(localStorage.getItem('user'));
    if(this.thisUser.type==0)
      this.joinTransport = this.fb.group
      ({
      'transportationId': [null, [Validators.required]],
      'address': [this.thisUser.address[0], Validators.required],
      'upNumber': [1,  [Validators.required, Validators.min(1)]]
      });
    else
      this.joinTransport = this.fb.group
        ({
        'transportationId': [null, [Validators.required]],
        'address': [this.thisUser.address[0], Validators.required]
        });

  }

  ngOnInit() {
    this.titleService.setTitle('Quick bus | הצטרפות להסעה');
    this.countAddressUser = this.thisUser.address.length;
    console.log('המשתמש: ' + this.thisUser.userName);
    // sessionStorage.setItem('address', this.joinTransport.get('address').value);
  }

  newwww:string;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.joinTransport.controls.address.setValue(result.name+result.vicinity);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  addAddress() {
    let a;
    // this.joinTransport.controls.address.setValue(this.newwww);
    if (this.newDefault) {
      a = this.thisUser.address[0];
      this.thisUser.address[0] = this.joinTransport.get('address').value;
      this.thisUser.address.push(a);
    }
    else
      this.thisUser.address.push(this.joinTransport.get('address').value);
    localStorage.setItem('user', JSON.stringify(this.thisUser));
    this.userSer.updateUser(this.thisUser).subscribe(
      data => {
        console.log(data);
      }
    );
  }

  default(element) {
    let a;
    for (var i = 0; i < this.thisUser.address.length; i++) {
      if (this.thisUser.address[i] == element) {
        a = this.thisUser.address[i];
        this.thisUser.address[i] = this.thisUser.address[0];
        this.thisUser.address[0] = a;
      }
      // this.meSer.family=this.thisUser;

      localStorage.setItem('user', JSON.stringify(this.thisUser));
    }
    this.userSer.updateUser(this.thisUser).subscribe(
      data => {
        console.log(data);
      }
    )

    console.log(this.thisUser.address);
  }

  setAddress(element) {
    this.joinTransport.controls['address'].setValue(element);
  }

  getIdError() {
    return 'קוד ההסעה שהקשתם הינו שגוי';
  }


  transportationId: string;
  flag: boolean = false;

  get transsss() { return this.joinTransport.get('transportationId'); }


  confirmStep(event: StepperSelectionEvent)
  {
    this.transSer.getAlltransport().subscribe(
        data => {
          this.transportationList = data;
          this.thisTransportation = data.find(x=>x.transportationId==this.joinTransport.get('transportationId').value);
          if(!this.thisTransportation)
          this.getIdError();
        },
        error => {
          alert(error.message);
        }
      );
  }

  //open messege
  openSnackBar(message: string) {
    this.snackBar.open(message, 'אישור',{
      duration: 2000,
    });
  }
  //פונקצית הוספת המשתמש לרשימת הממתינים
  toConfirm() {
    this.transSer.getTransportationById(this.joinTransport.get('transportationId').value).subscribe(data => {
      this.trans = data;
      console.log(this.trans);
      if (this.trans.waitingList.some(x=>x.user==this.thisUser.userId))
        this.openSnackBar('כבר בקשת להצטרף להסעה זו');
      else if (this.trans.usersAndAddress.some(x => x.user == this.thisUser.userId))
        this.openSnackBar('הנך כבר רשום להסעה זו, פרטים מדויקים על ההסעה ישלחו למייל במועד קרוב יותר למועד ההסעה');
      else {
        if(this.joinTransport.get('upNumber'))
        {
          this.newWait = new UsersAddress(this.thisUser.userId, this.joinTransport.get('address').value);
          for (let i = 0; i < this.joinTransport.get('upNumber').value; i++)
            this.trans.waitingList.push(this.newWait);

        }
        else
        {
          this.newWait = new UsersAddress(this.thisUser.userId, this.joinTransport.get('address').value);
          this.trans.waitingList.push(this.newWait);
        }
        this.transSer.updateTransport(this.trans).subscribe(x => {
          console.log(x);
          if (x)
            this.openSnackBar('בקשתך להצטרף לנסיעה התקבלה וממתינה לאישור המנהל');
        });
      }

    });
    this.router.navigate(['/UserMain']);
  }
  getErrorPassword() {

    if (this.transsss.value == "")
      return 'שדה זה חובה';
  }

  checkValisator(control: AbstractControl): { [Key: string]: boolean } {
    for (var i = 0; i < this.transportationList.length && !this.flag; i++) {
      if (this.transportationList[i].transportationId == this.transportationId) {
        this.thisTransportation = this.transportationList[i];
        return { 'id': true };
      }
    }
    return null;
  }

  async ValidateId( transSer: TransportationService)
  {
    var thisTransportation;
    await transSer.getAlltransport().subscribe(
      data => {
        thisTransportation = data.find(x=>x.transportationId==this.joinTransport.get('transportationId').value);
      });
    if (this.joinTransport.get('transportationId').value && thisTransportation) {
      return { 'idInvalid': true };
    }
    return null;
  }

}
//  export function check() {
//     for (var i = 0; i < this.transportationList.length && !this.flag; i++) {
//       if (this.transportationList[i].TransportationId == this.transportationId)
//         this.flag = true;
//     }
//     if (this.flag == false) {
//       return false;
//     }
//   }

// function ValidateId(control: AbstractControl, transSer: TransportationService): {[key: string]: any} | null  {
//   let thisTransportation;
//   transSer.getAlltransport().subscribe(
//     data => {
//       thisTransportation = data.find(x=>x.transportationId==control.value);
//     });
//   if (control.value && thisTransportation) {
//     return { 'idInvalid': true };
//   }
//   return null;
// }
