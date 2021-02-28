import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { FamilyService } from './Family.service';
import { stringify } from '@angular/compiler/src/util';
import { Location } from '@angular/common';

export interface wait {
  id: string,
  name: string,
  address: string,
  completed: boolean;
}

export interface participant
{
  name: string,
  address: string
}

@Injectable({
  providedIn: 'root'
})

export class TransportationService {

  trans: Transportation;
  myurl: any;
  constructor(private http: HttpClient, private globalService: GlobalService, private userSer: FamilyService) {
    this.myurl = globalService.baseURL;
  }
  getAlltransport(): Observable<Array<Transportation>> {
    var res = this.http.get<Array<Transportation>>(this.myurl + 'GetAllTransportation');
    return res;
  }

  getTransportationById(transportationId): Observable<Transportation> {
    var res = this.http.get<Transportation>(this.myurl + 'GetTransportationById?id=' + transportationId);//.subscribe(x => console.log(x));
    return res;
  }

  async getWaiteListDeatails(waitingList: any) {
    var newWait = {} as wait;
    var newWaitList = new Array<wait>();
    for (let i = 0; i < waitingList.waitingList.length; i++) {
      await this.userSer.getUserById(waitingList.waitingList[i].user).toPromise().then(x => {
        newWait.id = waitingList.waitingList[i].user;
        newWait.address = waitingList.waitingList[i].address;
        newWait.name = x.userName;
        newWait.completed=false;
        newWaitList.push(newWait);
        newWait = {} as wait;
      });
    }
    return newWaitList;
  }

  async gePassengersListDeatails(participants: any)
  {
    var part = {} as participant;
    var partice = new Array<participant>();
    for (let i = 0; i < participants.usersAndAddress.length; i++) {
      await this.userSer.getUserById(participants.usersAndAddress[i].user).toPromise().then(x => {
        part.address = participants.usersAndAddress[i].address;
        part.name = x.userName;
        partice.push(part);
        part = {} as wait;
      });
    }
    return partice;
  }

  addTransport(transport):Observable<Transportation[]>
  {
    var res=this.http.post<Transportation[]>(this.myurl+'AddTransportation', transport);
    return res;
  }

  updateTransport(trans): Observable<Transportation> {
    var res = this.http.put<Transportation>(this.myurl + 'PutTransportation', trans);
    return res;
  }
  delete(id):Observable<any>
  {
    return this.http.delete<any>(this.myurl+'DeleteTransportation?id='+ id);
  }

  calcRoute(id):Observable<any>
  {
    var a=this.http.get<any>(this.myurl+'CalcRoute?transportationId=' + id);
    return a;
  }

  stationUnion(route, distances, id):Observable<any>
  {
    var a=this.http.get<any>(this.myurl+'CalcRoute?transportationId=' + id + 'route=' + route + 'distances' + distances);
    return a;
  }

}
