import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Establishment } from '../../Classes/establishment';
import { Passenger } from '../../Classes/passenger';
import { HttpService } from '../../Services/http.service';


@Component({
  selector: 'app-new-manager',
  templateUrl: './new-manager.component.html',
  styleUrls: ['./new-manager.component.css']
})
export class NewManagerComponent implements OnInit {

  regiForm: FormGroup;
  PassengerList: Array<Passenger> = [];
  EstablishmentList: Array<Establishment> = [];
  newEstablishment: Establishment;

  constructor(private httpSer: HttpService, private router: Router, private fb: FormBuilder) {

    this.regiForm = this.fb.group({
      'EstablishmentName': [null, Validators.required],
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'Chekpassword': [null, [this.ChekPassword(), Validators.required, Validators.minLength(6)]],
      'address': [null, Validators.required],
      'Email': [null, Validators.required, Validators.email],
      'ContactCell': [null, Validators.required],
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


    this.httpSer.getEstablishmentList().subscribe(
      data => {
        this.EstablishmentList = data;
      },
      error => {
        alert(error.message);
      }

    );
  }

  flag2 = true;
  ChekPassword() {

    for (var i = 0; i < this.PassengerList.length && this.flag2; i++) {
      if (this.PassengerList[i].password == this.regiForm.value.password)
        this.flag2 = false;
    }

    for (var i = 0; i < this.EstablishmentList.length && this.flag2; i++) {
      if (this.EstablishmentList[i].password == this.regiForm.value.password)
        this.flag2 = false;
    }
    if (this.flag2 == false) {
      return 'הסיסמא שהזנת נמצאת כבר בשימוש נא הזן סיסמא אחרת';
    }
  }

  onFormSubmit() {
    let newEstablishment: Establishment = new Establishment(
      this.regiForm.value

    );

    this.httpSer.AddEstablishment(newEstablishment).subscribe(
      data => console.log(data),
      err => console.log(err)
    );

    if (data => console.log(data)) {
      alert("המוסד נוסף בהצלחה");
      this.router.navigate(["/MyTablesComponent"]);
    }
  }
}
