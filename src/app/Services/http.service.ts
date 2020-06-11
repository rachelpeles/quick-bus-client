// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { Member } from '../Classes/member';
// import { Category } from '../Classes/category';
// import { Area } from '../Classes/area';
// import { Lesiure } from '../Classes/lesiure';


// @Injectable({
//   providedIn: 'root'
// })
// export class HttpService {

//   constructor(private http:HttpClient) { }
//   baseUrl="http://localhost:42042/";

//   getMemberList():Observable<Member[]>
//   {
//      return this.http.get<Member[]>(this.baseUrl+"api/Members/GetAll");
//   }

//   getCategoryList():Observable<Category[]>
//   {
//      return this.http.get<Category[]>(this.baseUrl+"api/Category/GetAll");
//   }

//   getAreaList():Observable<Area[]>
//   {
//      return this.http.get<Area[]>(this.baseUrl+"api/Areas/GetAll");
//   }

//   getLesiureList():Observable<Lesiure[]>
//   {
//      return this.http.get<Lesiure[]>(this.baseUrl+"api/Lesiure/GetAll");
//   }

  

//   AddMember(member:Member):Observable<Member[]>
//   {
//     return this.http.post<Member[]>(this.baseUrl+"api/Members/AddMember",member);
//   }

//   AddCategory(category:Category):Observable<Category[]>
//   {
//     return this.http.post<Category[]>(this.baseUrl+"api/Category/AddCategory",category);
//   }

//   AddLesiure(lesiure:Lesiure):Observable<Lesiure[]>
//   {
//     return this.http.post<Lesiure[]>(this.baseUrl+"api/Lesiure/AddLesiure",lesiure);
//   }

//   DeleteMember(id:number):Observable<Member[]>
//   {
//     return this.http.delete<Member[]>(this.baseUrl+"api/Members/DeleteMembers/"+id);
//   }


// }



import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Passenger } from '../Classes/passenger';
import { Observable } from 'rxjs';
import { Establishment } from '../Classes/establishment';
import { Transportation } from '../Classes/transportation';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  baseUrl="http://localhost:10481/";
 
  
  getPassengerList():Observable<Passenger[]>
  {
     return this.http.get<Passenger[]>(this.baseUrl+"api/Passengers/GetAll");
  }

  AddPassenger(passenger:Passenger):Observable<Passenger[]>
  {
    return this.http.post<Passenger[]>(this.baseUrl+"api/Passengers/AddPassenger",passenger);
  }
  getEstablishmentList():Observable<Establishment[]>
  {
     return this.http.get<Establishment[]>(this.baseUrl+"api/Establishment/GetAll");
  }
  AddEstablishment(establishment:Establishment):Observable<Establishment[]>
  {
    return this.http.post<Establishment[]>(this.baseUrl+"api/Establishment/AddEstablishment",establishment);
  }

  getTransportationList():Observable<Transportation[]>
  {
     return this.http.get<Transportation[]>(this.baseUrl+"api/Transportations/GetAll");
  }
  AddTrasportation(transportation:Transportation):Observable<Transportation[]>
  {
    return this.http.post<Transportation[]>(this.baseUrl+"api/Transportatio/AddTransportation",transportation);
  }

}


