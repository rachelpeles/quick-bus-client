import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from '../Classes/establishment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  baseURL="http://localhost:10481/api/Establishment/";

  constructor(private http:HttpClient) { }

  update(form:object)
  {
    this.http.put(this.baseURL+'PutEstablishment/{object}', form);
  }
  

  add(est:Establishment)
  {
    // var street = this.getStreetId(addressFormGroup.value.street).subscribe(res=>{
    //   this.est= new Establishment(
    //     null,
    //     res,
    //     addressFormGroup.value.building,
    //     nameFormGroup.value.firstName,
    //     contactFormGroup.value.telephon,
    //     contactFormGroup.value.email,
    //     timesFormGroup.value.startHour,
    //     timesFormGroup.value.endHour);
      this.http.post(this.baseURL+'AddEstablishment', est).subscribe(x=> console.log(x));


    }

  deletepass(id)
  {
    this.http.delete(this.baseURL+'DeleteEstablishment/{id}', id);
  }

  streetURL="http://localhost:10481/api/Street/";

  getStreetId(streetName)
  {
    return this.http.get<number>(this.streetURL+'GetStreetByName/'+streetName).subscribe(res=>{return res})

  }
}
