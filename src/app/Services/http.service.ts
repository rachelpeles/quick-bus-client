import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { GlobalService } from './global.service';
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient, private basicUrl:GlobalService) { }


  getTransportationList():Observable<Transportation[]>
  {
     return this.http.get<Transportation[]>(this.basicUrl+"GetAllTransportationsList");
  }
  AddTrasportation(transportation:Transportation):Observable<Transportation[]>
  {
    return this.http.post<Transportation[]>(this.basicUrl+"AddTransportation",transportation);
  }

}


