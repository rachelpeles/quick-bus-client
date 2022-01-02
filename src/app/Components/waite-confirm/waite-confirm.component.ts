import { SelectionModel } from "@angular/cdk/collections";
import { Component, Inject, OnInit } from "@angular/core";
import {
  MatDialogRef,
  MatTableDataSource,
  MAT_DIALOG_DATA,
} from "@angular/material";
import { Family } from "src/app/Classes/Family";
import { Transportation } from "src/app/Classes/transportation";
import { EmailService } from "src/app/Services/email.service";
import { FamilyService } from "src/app/Services/Family.service";
import {
  TransportationService,
  wait,
} from "src/app/Services/transportation.service";

@Component({
  selector: "app-waite-confirm",
  templateUrl: "./waite-confirm.component.html",
  styleUrls: ["./waite-confirm.component.css"],
})
export class WaiteConfirmComponent implements OnInit {
  selection = new SelectionModel<wait>(true, []);
  list: wait[];
  a: wait[];
  completed: false;

  constructor(
    public dialogRef: MatDialogRef<WaiteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private transSer: TransportationService,
    private emailser: EmailService,
    private userSer: FamilyService
  ) {}

  async ngOnInit() {
    var b = await this.transSer.getWaiteListDeatails(this.data);
    this.list = b;
  }

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.list != null && this.list.every((t) => t.completed);
  }

  someComplete(): boolean {
    if (this.list == null) {
      return false;
    }
    return this.list.filter((t) => t.completed).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.list == null) {
      return;
    }
    this.list.forEach((t) => (t.completed = completed));
  }

  confirm() {
    var email;
    var usersAndAddressChanged = false;
    var usersAndAddresses=[];
    usersAndAddresses.push(...this.data.thisTrans.usersAndAddress);
    this.list.filter((t) => {
      if (t.completed){
        usersAndAddressChanged = true;
        this.data.thisTrans.usersAndAddress.push({
          user: t.id,
          address: t.address,
        });
      this.data.thisTrans.waitingList.splice(
        this.data.thisTrans.waitingList.indexOf({
          user: t.id,
          address: t.address,
        }),
        1
      );
      this.userSer.getFamilyList().subscribe((x) => {
        email = x.find((u) => u.userId == t.id).email;
        var htmlBody =
          `<html>        <head><style>h1, p{font-family: system-ui}</style>        </head>        <body>          <h3>` +
          `בשורה משמחת!</h3>          <p>היי, </p>` +
          `<p>בקשת להצטרף ל` +
          this.data.thisTrans.description +
          ` .</p>` +
          `<p>המנהל אישר את הצטרפותך, פרטים על הנסיעה יתקבלו מאוחר יותר.</p>` +
          `</p> <p>נסיעה טובה!!</p></p>        </body>      </html>`;

        this.emailser.sendEmailToList(email, "בקשתך אושרה", htmlBody);
      }); 
    }
    });

    if (usersAndAddressChanged){
      usersAndAddresses.forEach(element => {
        this.userSer.getFamilyList().subscribe((x) => {
          email = x.find((u) => u.userId == element.user).email;
          var htmlBody =
            `<html>        <head><style>h1, p{font-family: system-ui}</style>        </head>        <body>          <h3>` +
            `לתשומת לבך!</h3>          <p>היי, </p>` +
            `<p> אתה ברשימת הנוסעים בהסעה ` +
            this.data.thisTrans.description +
            ` .</p>` +
            `<p>מספר הנוסעים השתנה</p>` +
            `<p>נא עקוב אחר השינוי במסלול ובמחיר</p>` +
            `</p> <p>נסיעה טובה!!</p></p>        </body>      </html>`;
  
          this.emailser.sendEmailToList(email, "שינוי פרטי נסיעה", htmlBody);
        }); 
      });
    }
 
    this.transSer
      .updateTransport(this.data.thisTrans)
      .subscribe(async (res) => {
        console.log(res);
        var b = await this.transSer.getWaiteListDeatails(this.data);
        this.list = b;
      });
    this.dialogRef.close();
    alert("הנוסעים צורפו בהצלחה ויקבלו הודעה על כך");
  }

  reject() {
    var email: Array<string> = [];
    this.list.filter((t) => {
      this.data.thisTrans.waitingList.splice(
        this.data.thisTrans.waitingList.indexOf({
          user: t.id,
          address: t.address,
        }),
        1
      );
      this.userSer.getFamilyList().subscribe((x) => {
        email.push(x.find((u) => u.userId == t.id).email);
        this.emailser.sendEmailToList(
          email,
          "בקשתך נדחתה",
          "היי, בקשת להצטרף ל" +
            this.data.thisTrans.description +
            ". המנהל דחה את הצטרפותך, לא תוכל להצטרף לנסיעה זו. נפגש בנסיעות אחרות :)!"
        );
      });
    });
    this.transSer
      .updateTransport(this.data.thisTrans)
      .subscribe(async (res) => {
        console.log(res);
        var b = await this.transSer.getWaiteListDeatails(this.data);
        this.list = b;
      });
    this.dialogRef.close();
    alert("הנוסעים נדחו ויקבלו הודעה על כך");
  }
}
