
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Passenger } from 'src/app/Classes/passenger';
import { HttpService } from 'src/app/Services/http.service';
import { MyService } from 'src/app/Services/my.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  PassengerList: Array<Passenger> = [];
  regiForm: FormGroup;
  UserName: string;
  password: string;

  constructor(private httpSer: HttpService, private router: Router, private fb: FormBuilder, private mySer: MyService) {
    this.regiForm = this.fb.group({
      'UserName': [null, Validators.required],
      'Password': [null, [Validators.required, Validators.minLength(6)]],
      'Kind': [null]
    })

  }

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

  LogInto() {
    this.httpSer.getPassengerList().subscribe(
      data => {
        this.PassengerList = data;
      },
      error => {
        alert(error.message);
      }
    );

    var flag: boolean = false;
    for (var i = 0; i < this.PassengerList.length && !flag; i++) {

      if (this.PassengerList[i].UserName == this.UserName && this.PassengerList[i].password == this.password) {
        flag = true;
        this.mySer.passenger = this.PassengerList[i];

      }
    }

    if (flag) {

      alert("שם משתמש או הסיסמא שגויים");
      this.regiForm.value.password = "";
    }
    else {
      this.router.navigate(["/MyTablesComponent"]);
    }
  }

  New() {
    if (this.regiForm.value.kind == 'manager')
      this.router.navigate(["/NewManager"]);
    else
      this.router.navigate(["/AddPassenger"]);
  }


}
