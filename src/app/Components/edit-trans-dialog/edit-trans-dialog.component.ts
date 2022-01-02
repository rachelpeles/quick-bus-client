
/// <reference types="@types/googlemaps" />
import { findLast } from '@angular/compiler/src/directive_resolver';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { EmailService } from 'src/app/Services/email.service';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { TransportationService } from 'src/app/Services/transportation.service';
import { Title } from '@angular/platform-browser';
import { Location, Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;
import { Schedules } from 'src/app/Classes/schedules';
import { stringify } from '@angular/compiler/src/util';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-edit-trans-dialog',
  templateUrl: './edit-trans-dialog.component.html',
  styleUrls: ['./edit-trans-dialog.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class EditTransDialogComponent implements OnInit {

  action;
  localTrans = new Transportation();
  // transSchedule = new Schedules();
  isDispresion: string;
  addAddressToUser = false;
  userAddress;
  thisUser;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public scheduleDate:FormControl;
  time = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;

  constructor(public dialogRef: MatDialogRef<EditTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private transSer: TransportationService, private userSer: FamilyService, private emailSer: EmailService, private meSer: MyService, private titleService: Title, private snackBar: MatSnackBar) {
    if (this.data.actionType == 'edit') {
      this.action = 'עדכון הסעה';
      this.localTrans = Object.assign({}, this.data.thisTrans);
      this.scheduleDate = new FormControl(this.localTrans.schedules.date);
    }
    else if (this.data.actionType == 'add'){
      this.action = 'הוספת הסעה';
      this.scheduleDate = new FormControl();
    }
    // this.transSchedule.departureTime = this.localTrans.schedules? this.localTrans.schedules.departureTime : '';
  }

  ngOnInit() {
    this.thisUser = JSON.parse(localStorage.getItem('user'));
    
    this.titleService.setTitle('Quick bus | הסעות שיצרתי');
    this.userAddress = this.localTrans.usersAndAddress.find(x=>x.user==this.thisUser.address);
    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;

    this.setCurrentPosition();
  }


  async update() {
    this.localTrans.schedules.date = this.scheduleDate.value;
    this.localTrans.schedules.routes.isDispersion = JSON.parse(stringify(this.localTrans.schedules.routes.isDispersion));
    if (this.data.created) {
      this.data.thisTrans = this.localTrans;
      await this.transSer.updateTransport(this.localTrans).subscribe(x => {
        console.log(x);
        // this.localTrans = x;
        var email: Array<string> = [];
        email[0] = JSON.parse(localStorage.getItem('user')).email;
        this.emailSer.sendEmailToList(email,
          "עדכון ההסעה בוצע בהצלחה",
          "שלום " + this.thisUser.userName + ", שינית את ה" + this.data.thisTrans.description
          + ". קוד ההסעה: "
          + this.data.thisTrans.transportationId + ". כתובת היעד/ המוצא: "
          + this.data.thisTrans.address + ". זמן"
          + this.data.thisTrans.schedules.departureTime + ". נסיעה טובה!");
      });
      this.dialogRef.close(this.localTrans);


      var email: Array<string> = [];
      this.userSer.getFamilyList().subscribe(x => {
        this.data.thisTrans.usersAndAddress.forEach(element => {
          // email.push(x.find(u => u.userId == element.user).email);
          // this.emailSer.sendEmailToList(email,
          //   "ביטול הסעה"
          //   , "שלום רב, ההסעה: " + this.data.thisTrans.description + " בוטלה. היא לא תתקיים. בהצלחה ויום טוב");
        });
      });
    }
    else {
      this.localTrans.usersAndAddress.forEach((element, index) => {
        if (element.user === this.thisUser.userId)
          this.localTrans.usersAndAddress[index].address = this.userAddress;
        this.openSnackBar('הכתובת שלך להסעה שונתה בהצלחה!');
      });
      this.transSer.updateTransport(this.localTrans).subscribe(x => console.log(x));
      if (this.addAddressToUser && !(this.thisUser.address.find(x=>x==this.userAddress)))
      {
        this.thisUser.address.push(this.userAddress);
        localStorage.setItem('user', JSON.stringify(this.thisUser));
        this.userSer.updateUser(this.thisUser).subscribe(
          data => {
            console.log(data);
            this.openSnackBar('הכתובת שהזנת נוספה לרשימת הכתובות שלך');
          });
      }
      this.cancel();
    }
  }

  async add() {
    var addCreate: Family;
    this.localTrans.schedules.routes.isDispersion = JSON.parse(stringify(this.localTrans.schedules.routes.isDispersion));
    this.localTrans.schedules.date = this.scheduleDate.value;
    await this.transSer.addTransport(this.localTrans).subscribe(x => {
      this.localTrans = x[x.length - 1];
      this.dialogRef.close(this.localTrans);
      // addCreate=this.meSer.family;
      addCreate = JSON.parse(localStorage.getItem('user'));
      addCreate.transportationCreated.push(x[x.length - 1].transportationId);
      this.userSer.updateUser(addCreate).subscribe(x => console.log(x));
      // this.meSer.family=addCreate;
      localStorage.setItem('user', JSON.stringify(addCreate));
      alert('יצרת בהצלחה הסעה ל' + this.localTrans.description + ' פרטי ההסעה ישלחו אליך למייל ');

      var email: Array<string> = [];
      // email[0]=this.meSer.family.email;
      email[0] = JSON.parse(localStorage.getItem('user')).email;
      var htmlBody = 
      `<html>        <head><style>h1, p{font-family: system-ui}</style>        </head>        <body>          <h3>` + this.thisUser.userName  + `! יצירת ההסעה בוצעה בהצלחה!</h3>          <p>שלום, ה</p>` + this.localTrans.description+          `<p>נרשמה בהצלחה.</p>     <p>באפשרותך לשתף את קוד ההסעה שבעזרתו יוכלו אנשים נוספים להירשם להסעה. תוכל לאשר או לדחות את הצטרפותם.</p> <p></p>   <p>קוד הסעה: `+this.localTrans.transportationId+`</p> <p>כתובת היעד / המוצא: `+this.localTrans.address+ `</p> <p>תאריך: `+ this.localTrans.schedules.date.toString().slice(0,10)+`</p>      <p>שעה:`+ this.localTrans.schedules.departureTime+`</p> <p>נסיעה טובה!!</p></p>        </body>      </html>`;
      this.emailSer.sendEmailToList(email, "יצירת הסעה בוצעה בהצלחה!",
       htmlBody);
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  public appearance = Appearance;

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
    if(this.data.created)
      this.localTrans.address = result.formatted_address;
    else
      this.userAddress = result.formatted_address;
  }

  directionChanged(event){
    this.localTrans.schedules.routes.isDispersion = !this.localTrans.schedules.routes.isDispersion;
  }

  aa(){
    alert('hello');
  }

  onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    this.latitude = location.latitude;
    this.longitude = location.longitude;
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'אישור',{
      duration: 2000,
    });
  }
}
