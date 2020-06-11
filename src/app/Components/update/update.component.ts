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
  city;
  neighborhood;
  street;
  building;
  telephon;
  email;
  startHour;
  endHour;
  frequency;
  day;

  constructor(private httpSer:ChangesService, private fb: FormBuilder, private location: Location) {
    this.nameFormGroup = this.fb.group(
      {
        'firstName': ['', Validators.required],
      }
    )

    this.myForm= this.fb.group({
    

     });
    
    this.addressFormGroup = this.fb.group({
    'city': ['', Validators.required],
    'neighborhood': ['', Validators.required],
    'street': ['', Validators.required],
    'building': ['', ([Validators.required, Validators.min(1)])],})
    
    this.contactFormGroup=this.fb.group({
      'telephon': ['', ([Validators.required, Validators.minLength(7), Validators.maxLength(10)])],
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
  nameFormGroup=new FormGroup({});
  addressFormGroup=new FormGroup({});
  contactFormGroup=new FormGroup({});
  timesFormGroup=new FormGroup({});

  

  getErrorName()
  {
      return 'שדה זה חובה';
  }
  getErrorCity()
  {
      return 'שדה זה חובה';
  }
  getErrorNeighborhood()
  {
      return 'שדה זה חובה';
  }
  getErrorStreet()
  {
      return 'שדה זה חובה';
  }
  getErrorBuilding()
  {
    if(this.building.hasError(MinLengthValidator))
        return 'מספר בנין לא חוקי'
    else
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
    var nouveauProjet = {
      ...this.nameFormGroup.value,
      ...this.addressFormGroup.value,
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

//   get street()
//   {
//     return this.street;
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