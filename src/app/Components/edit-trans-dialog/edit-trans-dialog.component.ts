import { findLast } from '@angular/compiler/src/directive_resolver';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { EmailService } from 'src/app/Services/email.service';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { TransportationService } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-edit-trans-dialog',
  templateUrl: './edit-trans-dialog.component.html',
  styleUrls: ['./edit-trans-dialog.component.css']
})
export class EditTransDialogComponent implements OnInit {

  action;
  localTrans = new Transportation();
  constructor(public dialogRef: MatDialogRef<EditTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private transSer: TransportationService, private userSer: FamilyService, private emailSer: EmailService, private meSer: MyService) {
    if (this.data.actionType == 'edit') {
      this.action = 'עדכון הסעה';
      this.localTrans = Object.assign({}, this.data.thisTrans);
    }
    else if (this.data.actionType == 'add')
      this.action = 'הוספת הסעה';
  }

  ngOnInit() {

  }


  async update() {
    this.data.thisTrans = this.localTrans;
    await this.transSer.updateTransport(this.localTrans).subscribe(x => {
      console.log(x);
      this.localTrans = x;

      // var userName=this.meSer.family;
      var userName = JSON.parse(localStorage.getItem('user'));
      var email: Array<string> = [];
      // email[0]=this.meSer.family.email;
      email[0] = JSON.parse(localStorage.getItem('user')).email;
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
      addCreate = JSON.parse(localStorage.getItem('user'));
      addCreate.transportationCreated.push(x[x.length - 1].transportationId);
      this.userSer.updateUser(addCreate).subscribe(x => console.log(x));
      // this.meSer.family=addCreate;
      localStorage.setItem('user', JSON.stringify(addCreate));
      alert('יצרת בהצלחה הסעה ל' + this.localTrans.description + 'פרטי ההסעה ישלחו אליך למייל');

      var email: Array<string> = [];
      // email[0]=this.meSer.family.email;
      email[0] = JSON.parse(localStorage.getItem('user')).email;
      this.emailSer.sendEmailToList(email,
        "יצירת ההסעה בוצעה בהצלחה",
        "שלום, ה" + this.localTrans.description
        + " נרשמה בהצלחה. באפשרותך לשתף את קוד ההסעה שבעזרתו יוכלו אנשים נוספים להירשם להסעה. תוכל לאשר או לדחות את הצטרפותם. קוד ההסעה: "
        + this.localTrans.transportationId + "כתובת היעד/ המוצא: "
        + this.localTrans.address + "זמן: "
        + this.localTrans.schedules + "נסיעה טובה!");
    });

  }

  cancel() {
    this.dialogRef.close();

  }
}
