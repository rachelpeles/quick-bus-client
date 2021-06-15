///<reference types="@types/googlemaps" />
import { Component, OnInit, ɵɵqueryRefresh } from "@angular/core";
import { TransportationService } from "src/app/Services/transportation.service";
import { Location } from "@angular-material-extensions/google-maps-autocomplete";
import { Router } from "@angular/router";
import { stringify } from "@angular/compiler/src/util";
import { promise } from "selenium-webdriver";
import { GlobalService } from "src/app/Services/global.service";


@Component({
  selector: "app-calc-rout",
  templateUrl: "./calc-rout.component.html",
  styleUrls: ["./calc-rout.component.css"],
})
export class CalcRoutComponent implements OnInit {

  dir: Array<any> = new Array<any>();
  color = ["#FACA44", "#03E7D7", "#FF4B60", "black"];
  thisTrans = JSON.parse(localStorage.getItem("transToShow"));
  waypoints = new Array<Array<any>>();
  times: Array<any> = new Array<any>();
  price = 0;
  isDispersion = { str: this.thisTrans.schedules.routes.isDispersion ? 'פיזור' : 'איסוף', bool: this.thisTrans.schedules.routes.isDispersion };
  description = this.thisTrans.description;
  public latitude = 31.723342;
  public longitude = 35.013975;
  public zoom = 10;
  isunion = false;
  status = true;

  constructor(private transSer: TransportationService, private router: Router, private global: GlobalService) { }

  async ngOnInit() {
    this.refresh();
  }

  public getDirection() {
    for (let i = 0; i < this.waypoints.length; i++) {
      var a = {
        origin: null,
        destination: null,
        renderOptions: { polylineOptions: { strokeColor: this.color[i] } },
        waypoints: this.waypoints[i],
        travelMode: google.maps.TravelMode.DRIVING,
        markerOpts: {
          origin: {
            // label: "יציאה",
          },
          destination: {
            // label: "יעד",
          },
        },
        optimizeWaypoints: false,
      };
      if (this.thisTrans.schedules.routes.isDispersion == true) {
        a.origin = this.thisTrans.address;
        a.destination = this.waypoints[i][this.waypoints[i].length - 1].location;
      } else {
        a.origin = this.waypoints[i][0].location;
        a.destination = this.thisTrans.address;
      }
      this.dir.push(a);
      localStorage.setItem('dir', stringify(this.dir));
    }
  }

  //Function to get the longitude and latitude of address.
  getLatLng(address: string): Promise<google.maps.LatLng> {
    const geocoder = new google.maps.Geocoder();
    return new Promise((resolve, reject) => {
      geocoder.geocode(
        {
          address: address
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            const latLng = new google.maps.LatLng({
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            });

            resolve(latLng);
          } else {
            reject(new Error(status));
          }
        }
      );
    });
  }

  //פונקציה למיקוד בתחנה הנבחרת
  async onLocationSelected(address) {
    let lngLat = await this.getLatLng(address);
    this.latitude = lngLat.lat();
    this.longitude = lngLat.lng();
    this.zoom = 19;
  }

  async stationUnion() {
    let route: Array<string> = new Array<string>();
    for (let i = 0; i < this.waypoints.length; i++) {
      for (let j = 0; j < this.waypoints[i].length; j++) {
        if (j != 0)
          route.push(this.waypoints[i][j].location);
      }
    }
    this.price = 0;
    this.isunion = true;
    this.refresh(route, this.thisTrans.transportationId);
  }

  OK() {
    localStorage.setItem('transToShow', JSON.stringify(this.thisTrans));
    this.global.waypoints = this.waypoints;
    this.router.navigate(["Payment"]);
  }

  async refresh(route?, transportationId?) {
    if (this.isunion == false)
      await this.transSer
        .calcRoute(this.thisTrans.transportationId)
        .toPromise()
        .then((points) => {
          for (let i = 0, w = 0; i < points.way.length; i++) {
            if (points.way[i].length > 1) {
              for (let j = 0; j < points.way[i].length; j++) {
                if (j == 0)
                  this.waypoints[w] = new Array<string>();
                else if (
                  j + 1 == points.way[i].length &&
                  points.way[i + 1] &&
                  points.way[i + 1].length > 1 &&
                  points.way[i][j] != points.way[i][j - 1]
                )
                  this.waypoints.push(new Array<string>());
                if (points.way[i][j] != points.way[i][j - 1])
                  this.waypoints[w].push({
                    location: points.way[i][j].address,//TODO
                    stopover: true,
                  });
              }
              w++;
            }
          }
          for (let i = 0; i < points.time.length; i++) {
            this.times[i] = points.time[i];
            this.price += points.price[i];
          }
          this.thisTrans.schedules.price = this.price;
          this.global.vehicles = points.vehicleId;
          this.global.duration = this.times;
        });
    else
      await this.transSer
        .stationUnion(route, transportationId)
        .toPromise()
        .then((points) => {
          this.waypoints = new Array<Array<any>>();
          for (let i = 0, w = 0; i < points.way.length; i++) {
            if (points.way[i].length > 1) {
              for (let j = 0; j < points.way[i].length; j++) {
                if (j == 0)
                  this.waypoints[w] = new Array<string>();
                else if (
                  j + 1 == points.way[i].length &&
                  points.way[i + 1] &&
                  points.way[i + 1].length > 1 &&
                  points.way[i][j] != points.way[i][j - 1]
                )
                  this.waypoints.push(new Array<string>());
                if (points.way[i][j] != points.way[i][j - 1])
                  this.waypoints[w].push({
                    location: points.way[i][j].address,//TODO
                    stopover: true,
                  });
              }
              w++;
            }
          }
          for (let i = 0; i < points.time.length; i++) {
            this.times[i] = points.time[i];
            this.price += points.price[i];
          }
          this.thisTrans.schedules.price = this.price;
          this.global.vehicles = points.vehicleId;
          this.global.duration = this.times;
          this.dir = new Array<any>();
        });
    this.getDirection();
  }
}
