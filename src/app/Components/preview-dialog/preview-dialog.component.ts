import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { stringify } from 'querystring';
import { FamilyService } from 'src/app/Services/Family.service';
import { TransportationService } from 'src/app/Services/transportation.service';
import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-preview-dialog',
  templateUrl: './preview-dialog.component.html',
  styleUrls: ['./preview-dialog.component.css']
})
export class PreviewDialogComponent implements OnInit {

  dir: any;
  duration;
  public latitude = 31.723342;
  public longitude = 35.013975;
  public zoom = 10;
  
  constructor(public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private transSer: TransportationService, private userSer: FamilyService, private vehicleSer: VehiclesService, private titleService: Title) { }

  ngOnInit() {

    //route parameter = this user route.
    var route = this.data.thisTrans.schedules.routes.routeForVehicle.find(r=>r.station.users.find(u=>{
      if(u === this.data.thisUser.userId)
        route = r;
    }));

    this.duration = route.duration;

      this.dir = {
        origin: null,
        destination: null,
        renderOptions: { polylineOptions: { strokeColor: 'red' } },
        waypoints: route.stations.address,
        travelMode: google.maps.TravelMode.DRIVING,
        markerOpts: {
          origin: {},
          destination: {},
        },
        optimizeWaypoints: false,
      };
      if (this.data.thisTrans.schedules.routes.isDispersion == true) {
        this.dir.origin = this.data.thisTrans.address;
        this.dir.destination = route.stations[length-1].address;
      } else {
        this.vehicleSer.getVehicleById(route.vehicle).subscribe(v=>this.dir.origin = v);
        this.dir.destination = this.data.thisTrans.address;
      }
  }
}
