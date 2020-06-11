import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PassengerTransportationService {

  baseURL="http://localhost:10481/api/Transportations/";
  constructor(private http:HttpClient) { }

  getAllPassengertransport():Observable<Array<Transportation>>
  {
    var res = this.http.get<Array<Transportation>>(this.baseURL+'GetAll')
    return res;
  }

  delete(id)
  {
    this.http.delete(this.baseURL+'DeleteTransportations/{id}', id);
  }

}
