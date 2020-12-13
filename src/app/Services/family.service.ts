import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
    // this.http.get<Family>(this.myurl+"GetUserByUserId?userId=", id).subscribe(x=>{
    //   console.log(x);
    //   res=x;
    // });
    return res;
  }

  AddFamily(family: Family): Observable<Family[]> {
    return this.http.post<Family[]>(this.myurl + "AddUser", family);
  }

  updateUser(user: Family): Observable<Family[]> {
    return this.http.put<Family[]>(this.myurl + "PutUser", user);
  }
}
