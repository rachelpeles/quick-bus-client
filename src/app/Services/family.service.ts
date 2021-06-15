import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Family } from '../Classes/Family';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  myurl: any;

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.myurl = globalService.baseURL;
  }

  getFamilyList(): Observable<Family[]> {
    return this.http.get<Family[]>(this.myurl + "GetAllUserList");
  }

  getUserById(id): Observable<Family> {
    var res = this.http.get<Family>(this.myurl + "GetUserByUserId?userId=" + id);
    return res;
  }

  AddFamily(user): Observable<Family[]> {
    // const header = new HttpHeaders().set( 'Content-Type', 'application/json');
    return this.http.post<Family[]>(this.myurl + "AddUser", user);
  }

  updateUser(user: Family): Observable<Family[]> {
    return this.http.put<Family[]>(this.myurl + "PutUser", user);
  }
}
