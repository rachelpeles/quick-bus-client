import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Transportation } from 'src/app/Classes/transportation';
import { EmailService } from 'src/app/Services/email.service';
import { FamilyService } from 'src/app/Services/Family.service';
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
    @Inject(MAT_DIALOG_DATA) public data, private transSer: TransportationService, private userSer: FamilyService, private emailSer: EmailService) { }


  ngOnInit() {
    console.log(this.data);
    console.log(this.data.description);
  }

  del() {
    var email: Array<string> = [];
    this.transSer.delete(this.data.transportationId);
    this.userSer.getFamilyList().subscribe(x => {
      this.data.usersAndAddress.forEach(element => {
        email.push(x.find(u => u.userId == element.user).email);
        this.emailSer.sendEmailToList(email,
           "ביטול הסעה"
           , "שלום רב, מנהל ההסעה: " + this.data.description + "בוטלה. היא לא תתקיים. בהצלחה ויום טוב");
      });

    });
    alert('!ההסעה בוטלה! הודעה נשלחת לנוסעים');
  }

  cancel() {
    this.dialogRef.close();
  }
}