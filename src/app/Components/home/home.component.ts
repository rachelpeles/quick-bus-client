
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/Services/Family.service';
import { EstablishmentService } from 'src/app/Services/Establishment.service';
import { MyService } from 'src/app/Services/my.service';
import { Family } from '../../Classes/Family';
import { Establishment } from '../../Classes/establishment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  FamilyList: Array<Family> = [];
  EstablishmentList: Array<Establishment> = [];
  regiForm: FormGroup;
  // UserName: string;
  // password: string;
  hide=true;

  constructor(private router: Router, private fb: FormBuilder, private mySer: MyService, private FamilySer: FamilyService, private EstablishmentSer: EstablishmentService) {
    this.regiForm = this.fb.group({
      'UserName': [null, Validators.required],
      'Password': [null, [Validators.required, Validators.minLength(6)]],
      'Kind': [null]
    })

  }

  ngOnInit() {
    this.FamilySer.getFamilyList().subscribe(
      data => {
        this.FamilyList = data;
      },
      error => {
        alert(error.message);
      }

    );

    this.EstablishmentSer.getEstablishmentList().subscribe(
      data => {
        this.EstablishmentList = data;
      },
      error => {
        alert(error.message);
      }

    );
  }
  get Password() { return this.regiForm.get('Password'); }
  get UserName() { return this.regiForm.get('UserName'); }
  LogInto() {

    var flag: boolean = false;
    for (var i = 0; i < this.FamilyList.length && !flag; i++) {

      if (this.FamilyList[i].userName == this.UserName.value && this.FamilyList[i].password == this.Password.value) {
        flag = true;
        this.mySer.family = this.FamilyList[i];
        sessionStorage.setItem('user', JSON.stringify(this.FamilyList[i]));
        alert("ברוכים הבאים ל"+this.UserName.value);
        this.router.navigate(["/PassengersComponent"]);

      }
    }

    if (!flag) {

      alert("שם משתמש או הסיסמא שגויים");
      this.regiForm.value.password = "";
    }      
  }

  New() {
    debugger;
    
    if (this.regiForm.value.Kind == 'manager')
      this.router.navigate(["/NewManager"]);
    else
      this.router.navigate(["/AddPassenger"]);
  }


}
