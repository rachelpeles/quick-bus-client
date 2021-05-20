import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatDialog} from '@angular/material';
import { Router } from '@angular/router';
import { Family } from 'src/app/Classes/Family';
import { FamilyService } from '../../Services/Family.service';
import { NewPassengerDialogComponent } from '../new-passenger-dialog/new-passenger-dialog.component';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  regiForm: FormGroup;
  constructor(private familySer: FamilyService, private router: Router, private fb: FormBuilder ,private dialog:MatDialog) {

    this.regiForm = this.fb.group({
      'userName': [null, Validators.required],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'Chekpassword': [null, [chek, Validators.required, Validators.minLength(6)]],
      'email': ['', ([Validators.required, Validators.email])],
      'address': [null, Validators.required],
      'phone': [null, Validators.required]
    })

  }

  FamilyList: Array<Family> = [];

  ngOnInit() {
    this.familySer.getFamilyList().subscribe(
      data => {
        this.FamilyList = data;
      },
      error => {
        alert(error.message);
      }

    );
  }


  userName
: string;
  flag: boolean = false;
  flag2: boolean = true;
  
  get password() { return this.regiForm.get('password'); }
  get Chekpassword() { return this.regiForm.get('Chekpassword'); }

  ChekPassword() {

    for (var i = 0; i < this.FamilyList.length && this.flag2; i++) {
      if (this.FamilyList[i].userName
 == this.userName
 && this.FamilyList[i].password == this.password.value)
        this.flag2 = false;
    }
    if (this.flag2 == false) {
      return 'הסיסמא שהזנת נמצאת כבר בשימוש נא הזן סיסמא אחרת';
    }
    this.flag = this.flag2;


  }



  onFormSubmit() {
    let newFamily: Family = new Family(
      "",
      this.regiForm.get('userName').value,
      this.regiForm.get('password').value,
      this.regiForm.get('phone').value,
      this.regiForm.get('address').value,
      this.regiForm.get('email').value
    );

    this.familySer.AddFamily(newFamily).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    if (data => console.log(data)) {
      alert("פרטיכם נקלטו בהצלחה במערכת");
      this.router.navigate(["/UserMain"]);

      //this.router.navigate(["/MyTablesComponent"]);
    }
  }
  getErrorPassword() {

    if (this.regiForm.get('Chekpassword').value == "")
      return 'שדה זה חובה';
    else if (this.regiForm.get('Chekpassword').value != this.regiForm.get('password').value)
      return 'אימות סיסמא אינו תואם לסיסמא'

  }
  dataSource;
  action(actionType, thisPassenger): void {
    const dialogRef = this.dialog.open(NewPassengerDialogComponent,
      {
        width: '250px',
        data: { actionType: actionType, thisPassenger: thisPassenger }
      });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.dataSource.passenger = result;
    });
  }
}
export function chek(control: AbstractControl): {
  [key: string]: any
} | null {
  let valid = false;
  if (control.value == null)
    valid = true;
  else if (control.value == this.regiForm.get("password").value) {
    valid = true;
  }
  return valid ? null : { noletter: { valid: valid, value: control.value } }
}

