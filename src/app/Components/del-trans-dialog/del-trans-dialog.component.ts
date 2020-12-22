import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { EmailService } from 'src/app/Services/email.service';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { TransportationService } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-del-trans-dialog',
  templateUrl: './del-trans-dialog.component.html',
  styleUrls: ['./del-trans-dialog.component.css']
})
@NgModule({
  imports: [MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule]
})
export class DelTransDialogComponent implements OnInit {


  constructor(public dialogRef: MatDialogRef<DelTransDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private transSer: TransportationService, private userSer: FamilyService, private emailSer: EmailService, private meSer: MyService) { }


  ngOnInit() {
    console.log(this.data);
    console.log(this.data.description);
  }

  del() {
    var thisUser:Family;
    var email: Array<string> = [];
    this.transSer.delete(this.data.thisTrans.transportationId).subscribe(x=>console.log(x));
    this.userSer.getFamilyList().subscribe(x => {
      this.data.thisTrans.usersAndAddress.forEach(element => {
        email.push(x.find(u => u.userId == element.user).email);
        this.emailSer.sendEmailToList(email,
           "ביטול הסעה"
           , "שלום רב, ההסעה: " + this.data.thisTrans.description + " בוטלה. היא לא תתקיים. בהצלחה ויום טוב");
      });
      // thisUser=this.meSer.family;
      thisUser = JSON.parse(localStorage.getItem('user'));
      thisUser.transportationCreated.splice(this.data.thisTrans.transportationId);
      this.userSer.updateUser(thisUser).subscribe(z=>console.log(z));
    });
    alert('!ההסעה בוטלה! הודעה נשלחת לנוסעים');
    this.dialogRef.close();
  }

  cancel() {
    this.dialogRef.close();
  }
}