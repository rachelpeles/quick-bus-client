import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class PassengerTransportationService {

  myurl: any;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.myurl = globalService.baseURL;
  }
  getAllPassengertransport():Observable<Array<Transportation>>
  {
    var res = this.http.get<Array<Transportation>>(this.myurl+'GetAllTransportation')
    return res;
  }

  delete(id)
  {
    this.http.delete(this.myurl+'DeleteTransportations/{id}', id);
  }

}
