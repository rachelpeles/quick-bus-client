import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { HttpService } from 'src/app/Services/http.service';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/Classes/passenger';

@Component({
  selector: 'app-add-passenger',
  templateUrl: './add-passenger.component.html',
  styleUrls: ['./add-passenger.component.css']
})
export class AddPassengerComponent implements OnInit {

  regiForm: FormGroup;
  constructor(private httpSer: HttpService, private router: Router, private fb: FormBuilder) {

    this.regiForm = this.fb.group({
      'PassengerId': [null, Validators.required],
      'PassengerFirstName': [null, Validators.required],
      'PassengerLastName': [null, Validators.required],
      'StreetId': [null, Validators.required],
      'Building': [null, Validators.required],
      'Telephone': [null, Validators.required],
      'FatherCell': [null, Validators.required],
      'MotherCell': [null, Validators.required],
      'Email': [null, Validators.required],
      'EstablishmentId': [null, Validators.required],
      'UserName': [null, Validators.required],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'Chekpassword': [null, [chek, Validators.required, Validators.minLength(6)]]

    })

  }

  PassengerList: Array<Passenger> = [];

  ngOnInit() {
    this.httpSer.getPassengerList().subscribe(
      data => {
        this.PassengerList = data;
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

    for (var i = 0; i < this.PassengerList.length && this.flag2; i++) {
      if (this.PassengerList[i].UserName == this.UserName && this.PassengerList[i].password == this.password.value)
        this.flag2 = false;
    }
    if (this.flag2 == false) {
      return 'הסיסמא שהזנת נמצאת כבר בשימוש נא הזן סיסמא אחרת';
    }
    this.flag = this.flag2;


  }



  onFormSubmit() {
    let newPassenger: Passenger = new Passenger(
      this.regiForm.get('PassengerId').value,
      this.regiForm.get('PassengerFirstName').value,
      this.regiForm.get('PassengerLastName').value,
      this.regiForm.get('StreetId').value,
      this.regiForm.get('Building').value,
      this.regiForm.get('Telephone').value,
      this.regiForm.get('FatherCell').value,
      this.regiForm.get('MotherCell').value,
      this.regiForm.get('Email').value,
      this.regiForm.get('EstablishmentId').value,
      this.regiForm.get('UserName').value,
      this.regiForm.get('password').value,
    );

    this.httpSer.AddPassenger(newPassenger).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    if (data => console.log(data)) {
      alert("נוספתם בהצלחה לרשימת נוסעינו!")
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

