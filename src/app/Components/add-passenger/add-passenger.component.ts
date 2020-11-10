import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Family } from 'src/app/Classes/Family';
import { FamilyService } from '../../Services/Family.service';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  regiForm: FormGroup;
  constructor(private familySer: FamilyService, private router: Router, private fb: FormBuilder) {

    this.regiForm = this.fb.group({
      'UserName': [null, Validators.required],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'Chekpassword': [null, [chek, Validators.required, Validators.minLength(6)]],
      'Email': ['', ([Validators.required, Validators.email])],
      'Address': [null, Validators.required],
      'Telephone': [null, Validators.required],
      'Phelephone': [null, Validators.required]
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


  UserName: string;
  flag: boolean = false;
  flag2: boolean = true;
  
  get password() { return this.regiForm.get('password'); }
  get Chekpassword() { return this.regiForm.get('Chekpassword'); }

  ChekPassword() {

    for (var i = 0; i < this.FamilyList.length && this.flag2; i++) {
      if (this.FamilyList[i].userName == this.UserName && this.FamilyList[i].password == this.password.value)
        this.flag2 = false;
    }
    if (this.flag2 == false) {
      return 'הסיסמא שהזנת נמצאת כבר בשימוש נא הזן סיסמא אחרת';
    }
    this.flag = this.flag2;


  }



  onFormSubmit() {
    let newFamily: Family = new Family(
      this.regiForm.get('UserName').value,
      this.regiForm.get('password').value,
      this.regiForm.get('Email').value,
      this.regiForm.get('Address').value,
      this.regiForm.get('Telephone').value,
      this.regiForm.get('Phelephone').value
    );

    this.familySer.AddFamily(newFamily).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    if (data => console.log(data)) {
      alert("פרטיכם נקלטו בהצלחה במערכת");
      this.router.navigate(["/AddChild"]);

      this.router.navigate(["/MyTablesComponent"]);
    }
  }
  getErrorPassword() {

    if (this.regiForm.get('Chekpassword').value == "")
      return 'שדה זה חובה';
    else if (this.regiForm.get('Chekpassword').value != this.regiForm.get('password').value)
      return 'אימות סיסמא אינו תואם לסיסמא'

  }
}
export function chek(control: AbstractControl): {
  [key: string]: any
} | null {
  let valid = false;
  if (control.value == null)
    valid = true;
  else if (control.value == this.regiForm.get('password').value) {
    valid = true;
  }
  return valid ? null : { noletter: { valid: valid, value: control.value } }
}

