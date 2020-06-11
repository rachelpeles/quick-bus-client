import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicles } from '../Classes/vehicles';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {

  constructor(private http:HttpClient) { }

  baseURL="http://localhost:10481/api/Vehicles/";

  getAllVehicles():Observable<Array<Vehicles>>
  {
    var res = this.http.get<Array<Vehicles>>(this.baseURL+'GetAll');
    return res;
  }

  add(vehicle)
  {
    this.http.post(this.baseURL+'AddVehicles', vehicle).subscribe(x=> console.log(x));
  }
  update(vehicle)
  {
    this.http.put(this.baseURL+'PutVehicles/{value}', vehicle);
  }
  del(id)
  {
    this.http.delete(this.baseURL+'DeleteVehicles/{id}'+id);
  }
}
