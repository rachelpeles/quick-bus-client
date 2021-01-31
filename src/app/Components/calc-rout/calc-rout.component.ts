///<reference types="@types/googlemaps" />
import { Component, OnInit } from "@angular/core";
import { TransportationService } from "src/app/Services/transportation.service";
import { Location } from "@angular-material-extensions/google-maps-autocomplete";
import { ok } from "assert";


@Component({
  selector: "app-calc-rout",
  templateUrl: "./calc-rout.component.html",
  styleUrls: ["./calc-rout.component.css"],
})
export class CalcRoutComponent implements OnInit {

  numbering=0;
  dir: Array<any> = new Array<any>();
  color = ["red", "blue", "orange", "pink"];
  waypoints = new Array<Array<any>>();
  times: Array<any>=new Array<any>();
  price=0;
  isDispersion=JSON.parse(localStorage.getItem("transToShow")).schedules.routes.isDispersion? 'פיזור': 'איסוף';
  description=JSON.parse(localStorage.getItem("transToShow")).description;
  public latitude = 31.723342;
  public longitude = 35.013975;
  public zoom = 10;

  constructor(private transSer: TransportationService) {}

  async ngOnInit() {
    await this.transSer
      .calcRoute(JSON.parse(localStorage.getItem("transToShow")).transportationId)
      .toPromise()
      .then((points) => {
        for (let i = 0, w = 0; i < points.way.length; i++) {
          if (points.way[i].length > 1) {
            for (let j = 0; j < points.way[i].length; j++) {
              if (j == 0) {
                this.waypoints[w] = new Array<string>();
              } else if (
                j + 1 == points.way[i].length &&
                points.way[i + 1] &&
                points.way[i + 1].length > 1
              )
                this.waypoints.push(new Array<string>());

              this.waypoints[w].push({
                location: points.way[i][j],
                stopover: true,
              });
            }
            w++;
          }
        }
        for (let i = 0; i < points.time.length; i++)
        {
          this.times[i] = points.time[i];
          this.price+=points.price[i];
        }
      });
    this.getDirection();
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
            label: "יציאה",
          },
          destination: {
            label: "יעד",
          },
        },
        optimizeWaypoints: false,
      };
      if (JSON.parse(localStorage.getItem("transToShow")).schedules.routes.isDispersion == true)
      {
        a.origin = JSON.parse(localStorage.getItem("transToShow")).address;
        a.destination = this.waypoints[i][this.waypoints[i].length - 1].location;
      } else
      {
        a.origin = this.waypoints[i][0].location;
        a.destination = JSON.parse(localStorage.getItem("transToShow")).address;
      }
      this.dir.push(a);
    }
  }

  //פונקציה למיקוד בתחנה הנבחרת
  onLocationSelected(address)
  {
      var geocoder=new google.maps.Geocoder();
      geocoder.geocode({'address': address}, (results, status) =>
      {
        if (status == google.maps.GeocoderStatus.OK)
        {
            this.latitude = results[0].geometry.location.lat();
            this.longitude = results[0].geometry.location.lng();
            this.zoom = 19;
        }
        else
        {
            console.log('Error - ', results, ' & Status - ', status);
        }
      });
  }
}
