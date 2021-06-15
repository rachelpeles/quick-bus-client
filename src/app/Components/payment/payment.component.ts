import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { RouteForVehicle } from 'src/app/Classes/route-for-vehicle';
import { Station } from 'src/app/Classes/station';
import { FamilyService } from 'src/app/Services/Family.service';
import { GlobalService } from 'src/app/Services/global.service';
import { TransportationService } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  thisTrans = JSON.parse(localStorage.getItem("transToShow"));
  local = this.thisTrans.description;
  waypoint;
  constructor(private global: GlobalService, private transportationService: TransportationService) {
    this.waypoint = this.global.waypoints;
    console.log(this.waypoint);
   }

  ngOnInit() {
    
  }

  byPassengers() {
    var list = JSON.parse(localStorage.getItem('dir'));
    for (let i = 0; i < list.length; i++) {
      for (let j = 0; j < list[i].length; j++) {


      }

    }
  }

  save()
  {
    this.thisTrans.schedules.routes.countUsers = this.thisTrans.usersAndAddress.length;
    this.thisTrans.schedules.routes.routeForVehicle = new Array<RouteForVehicle>();
    for (let i = 0; i < this.waypoint.length; i++)
    {
      var routeForVehicle: RouteForVehicle = new RouteForVehicle();
      routeForVehicle.vehicle = this.global.vehicles[i];
      for (let j = 1; j < this.waypoint[i].length; j++)
      {
        routeForVehicle.duration = stringify(this.global.duration[i]);
        routeForVehicle.station = new Array<Station>();
        var station: Station = new Station();
        station.address = this.waypoint[i][j].location;
        station.oridinalNumber = j;
        for (let u = 1; u < this.waypoint[i].length; u++)
          station.users.push(this.thisTrans.usersAndAddress.find(x => x.address === this.waypoint[i][u].location).user);
        routeForVehicle.station.push(station);
      }
      this.thisTrans.schedules.routes.routeForVehicle.push(routeForVehicle);
    }
    this.transportationService.updateTransport(this.thisTrans).subscribe(x => console.log(x));
  }
}
