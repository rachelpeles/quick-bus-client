import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Transportation } from '../Classes/transportation';
import { HttpClient } from '@angular/common/http';
import { GlobalService } from './global.service';
import { FamilyService } from './Family.service';

export interface wait {
  id: string,
  name: string,
  address: string
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

  async getWaiteListDeatails(waitingList: any){
    // console.log(waitingList);
    // console.log(waitingList.thisTrans.length);
    // var newWait = {} as wait;
    var newWaitList: wait[] = {} as wait[];
      for (let i = 0; i < waitingList.thisTrans.length; i++) {
        await this.userSer.getUserById(waitingList.thisTrans[i].user).subscribe(x => {
          newWaitList[i].id = waitingList.thisTrans[i].user;
          newWaitList[i].address = waitingList.thisTrans[i].address;
          newWaitList[i].name = x.userName;
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
