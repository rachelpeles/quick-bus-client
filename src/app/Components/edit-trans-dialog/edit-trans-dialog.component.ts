
/// <reference types="@types/googlemaps" />
import { findLast } from '@angular/compiler/src/directive_resolver';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { EmailService } from 'src/app/Services/email.service';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { TransportationService } from 'src/app/Services/transportation.service';
import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;


@Component({
  selector: 'app-edit-trans-dialog',
  templateUrl: './edit-trans-dialog.component.html',
  styleUrls: ['./edit-trans-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTransDialogComponent implements OnInit {

  action;
  localTrans = new Transportation();
  constructor(public dialogRef: MatDialogRef<EditTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private transSer: TransportationService, private userSer: FamilyService, private emailSer: EmailService, private meSer: MyService, private titleService: Title) {
    if (this.data.actionType == 'edit') {
      this.action = 'עדכון הסעה';
      this.localTrans = Object.assign({}, this.data.thisTrans);
    }
    else if (this.data.actionType == 'add')
      this.action = 'הוספת הסעה';
  }

  ngOnInit() {
    this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();
  }


  async update() {
    this.data.thisTrans = this.localTrans;
    await this.transSer.updateTransport(this.localTrans).subscribe(x => {
      console.log(x);
      this.localTrans = x;

      // var userName=this.meSer.family;
      var userName = JSON.parse(sessionStorage.getItem('user'));
      var email: Array<string> = [];
      // email[0]=this.meSer.family.email;
      email[0] = JSON.parse(sessionStorage.getItem('user')).email;
      this.emailSer.sendEmailToList(email,
        "עדכון ההסעה בוצע בהצלחה",
        "שלום "+ userName.userName+", שינית את ה"+this.data.thisTrans.description
        +". קוד ההסעה: "
        + this.data.thisTrans.transportationId + ". כתובת היעד/ המוצא: "
        + this.data.thisTrans.address + ". זמן"
        + this.data.thisTrans.schedules + ". נסיעה טובה!");
    });
    this.dialogRef.close(this.localTrans);


    var email: Array<string> = [];
    this.userSer.getFamilyList().subscribe(x => {
      this.data.thisTrans.usersAndAddress.forEach(element => {
        email.push(x.find(u => u.userId == element.user).email);
        this.emailSer.sendEmailToList(email,
           "ביטול הסעה"
           , "שלום רב, ההסעה: " + this.data.thisTrans.description + " בוטלה. היא לא תתקיים. בהצלחה ויום טוב");
      });
    });
  }

  async add()
  {
    var addCreate: Family;
    await this.transSer.addTransport(this.localTrans).subscribe(x => {
      this.localTrans = x[x.length - 1];
      this.dialogRef.close(this.localTrans);
      // addCreate=this.meSer.family;
      addCreate = JSON.parse(sessionStorage.getItem('user'));
      addCreate.transportationCreated.push(x[x.length - 1].transportationId);
      this.userSer.updateUser(addCreate).subscribe(x => console.log(x));
      // this.meSer.family=addCreate;
      sessionStorage.setItem('user', JSON.stringify(addCreate));
      alert('יצרת בהצלחה הסעה ל' + this.localTrans.description + 'פרטי ההסעה ישלחו אליך למייל');

      var email: Array<string> = [];
      // email[0]=this.meSer.family.email;
      email[0] = JSON.parse(sessionStorage.getItem('user')).email;
      this.emailSer.sendEmailToList(email,
        "יצירת ההסעה בוצעה בהצלחה",
        "שלום, ה" + this.localTrans.description
        + " נרשמה בהצלחה. באפשרותך לשתף את קוד ההסעה שבעזרתו יוכלו אנשים נוספים להירשם להסעה. תוכל לאשר או לדחות את הצטרפותם. קוד ההסעה: "
        + this.localTrans.transportationId + "כתובת היעד/ המוצא: "
        + this.localTrans.address + "זמן: "
        + this.localTrans.schedules + "נסיעה טובה!");
    });

  }

  cancel()
  {
    this.dialogRef.close();
  }

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public selectedAddress: PlaceResult;

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }
}
