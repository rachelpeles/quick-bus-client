import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  public baseURL="https://localhost:5001/";
  isHome = true;
  public waypoints = new Array<Array<any>>();
  public vehicles = new Array<string>();
  public duration = new Array<any>();
}
