import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from '../Classes/establishment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ChangesService {

  baseURL="https://localhost:44366/api/Establishment/";

  constructor(private http:HttpClient) { }

  update(form:object)
  {
    this.http.put(this.baseURL+'PutEstablishment/{object}', form);
  }
  

  add(est:Establishment)
  {
      this.http.post(this.baseURL+'AddEstablishment', est).subscribe(x=> console.log(x));


    }

  deletepass(id)
  {
    this.http.delete(this.baseURL+'DeleteEstablishment/{id}', id);
  }
}
