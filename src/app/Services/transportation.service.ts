import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { FamilyService } from './Family.service';

export interface wait {
  id: string,
  name: string,
  address: string,
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class TransportationService {

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

  joinUserToTransport(trans): Observable<Transportation> {
    var res = this.http.put<Transportation>(this.myurl + 'PutTransportation', trans);
    return res;
  }
  delete(id) {
    this.http.delete(this.myurl + 'DeleteTransportations/{id}', id);
  }

}
