import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Establishment } from '../Classes/establishment';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})

export class EstablishmentService {

  myurl: any;

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.myurl = globalService.baseURL;
  }

  getEstablishmentList(): Observable<Establishment[]> {
    return this.http.get<Establishment[]>(this.myurl + "GetAllEstablishmentList");
  }
  AddEstablishment(establishment: Establishment): Observable<Establishment[]> {
    return this.http.post<Establishment[]>(this.myurl + "AddEstablishment", establishment);
  }
}
