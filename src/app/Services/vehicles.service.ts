import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicles } from '../Classes/vehicles';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  myurl: any;
  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.myurl = globalService.baseURL;
  }
  getAllVehicles():Observable<Array<Vehicles>>
  {
    var res = this.http.get<Array<Vehicles>>(this.myurl+'GetAllVehiclesList');
    return res;
  }

  add(vehicle)
  {
    this.http.post(this.myurl+'AddVehicles', vehicle).subscribe(x=> console.log(x));
  }
  update(vehicle)
  {
    this.http.put(this.myurl+'PutVehicles/{value}', vehicle);
  }
  del(id)
  {
    this.http.delete(this.myurl+'DeleteVehicles/{id}'+id);
  }
}
