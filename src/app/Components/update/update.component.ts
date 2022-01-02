import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators, MaxLengthValidator, FormBuilder, MinLengthValidator} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { ChangesService } from 'src/app/Services/changes.service';
import { Establishment } from 'src/app/Classes/establishment';
import {Location} from '@angular/common';


@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  myForm: FormGroup;
  firstName;
  address;
  telephon;
  email;
  startHour;
  endHour;
  frequency;
  day;

  constructor(private httpSer:ChangesService, private fb: FormBuilder, private location: Location) {
    this.personalDeatailsFormGroup = this.fb.group(
      {
        'firstName': ['', Validators.required],
        'address': ['', Validators.required]
      }
    )

    this.myForm= this.fb.group({
    

     });
    
    
    
    this.contactFormGroup=this.fb.group({
      'telephon': ['', ([Validators.required, Validators.minLength(7)])],
      'email': ['', ([Validators.required, Validators.email])],
    })

    this.timesFormGroup=this.fb.group({
      'startHour': ['', Validators.required],
      'endHour': ['', Validators.required],
      'frequency': ['', Validators.required],
      'day': ['']
    })
   }



  ngOnInit() {
  }
  personalDeatailsFormGroup=new FormGroup({});
  contactFormGroup=new FormGroup({});
  timesFormGroup=new FormGroup({});

  

  getErrorName()
  {
      return 'שדה זה חובה';
  }
  getErrorAddress()
  {
      return 'שדה זה חובה';
  }
  
  getErrorPhon()
  {
      return 'שדה זה חובה';
  }
  getErrorEmail()
  {
      return 'שדה זה חובה';
  }
  getErrorFrequency()
  {
      return 'שדה זה חובה';
  }
  
  

  update()
  {
    debugger;
    var nouveauProjet = {
      ...this.personalDeatailsFormGroup.value,
      ...this.contactFormGroup.value,
      ...this.timesFormGroup.value
    };
      this.httpSer.add(nouveauProjet);
  }

  cancel()
  {
    this.location.back();
  }

//   get firstName()
//   {
//     return this.firstName;
//   }

//   get neighborhood()
//   {
//     return this.neighborhood;
//   }
//   get city()
//   {
//     return this.neighborhood;
//   }
//   get building()
//   {
//     return this.building;
//   }

//   get telephon()
//   {
//     return this.telephon;
//   }
//   get email()
//   {
//     return this.email;
//   }
//   get startHour()
//   {
//     return this.startHour;
//   }
//   get endHour()
//   {
//     return this.endHour;
//   }
//   get frequency()
//   {
//     return this.frequency;
//   }
//   get day()
//   {
//     return this.day;
//   }

//   matcher=new ErrorStateMatcher();
// }
}