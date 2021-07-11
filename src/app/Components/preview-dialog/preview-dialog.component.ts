///<reference types="@types/googlemaps" />
import { MapsAPILoader } from '@agm/core';
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

  route;
  dir: Array<any> = new Array<any>();
  duration;
  way;
  driverAddress;
  public latitude = 31.723342;
  public longitude = 35.013975;
  public zoom = 10;
  isLoaded = false;

  
  constructor(public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private transSer: TransportationService, private userSer: FamilyService, private vehicleSer: VehiclesService, private titleService: Title, private mapsAPILoader: MapsAPILoader) { }


  async ngOnInit() {
    this.refresh();
  }

  async getDirections()
  {
    
      this.way = new Array<any>();
      for (let i = 0; i < this.route.stations.length; i++) {
        this.way.push({
          location: this.route.stations[i].address,
          stopover: true
        });        
      }
      

    this.duration = this.route.duration;
      this.mapsAPILoader.load().then(()=>{
        
        var a = {
          origin: null,
          destination: null,
          renderOptions: { polylineOptions: { strokeColor: 'red' } },
          waypoints: this.way,
          travelMode: google.maps.TravelMode.DRIVING,
          optimizeWaypoints: false,
        };

        if (this.data.thisTrans.schedules.routes.isDispersion == true) {
          a.origin = this.data.thisTrans.address;
          a.destination = this.route.stations[length-1].address;
        } else {
          a.origin = this.driverAddress;
          a.destination = this.data.thisTrans.address;
        }
        this.dir.push(a);
      console.log(this.dir);
      this.isLoaded = true;
    });
  }

  async refresh()
  {
    //route parameter = this user route.
    this.data.thisTrans.schedules.routes.routeForVehicle.find(r=>{
      r.stations.find(s=>s.users.find(u=>{
        if(u === this.data.thisUser.userId)
          this.route = r;
      }))});
    await this.vehicleSer.getVehicleById(this.route.vehicle).subscribe(v=>{
      this.driverAddress = v.driverAddress;
      console.log(this.driverAddress);
      this.getDirections();
    });
  }
}
