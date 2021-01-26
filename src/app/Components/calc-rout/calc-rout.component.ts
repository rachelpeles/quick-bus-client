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
  public latitude = 31.723342;
  public longitude = 35.013975;
  public zoom = 10;

  constructor(private transSer: TransportationService) {}

  async ngOnInit() {
    await this.transSer
      .calcRoute(this.transSer.trans.transportationId)
      .toPromise()
      .then((points) => {
        for (let i = 0, w = 0; i < points.length; i++) {
          if (points[i].length > 1) {
            for (let j = 0; j < points[i].length; j++) {
              if (j == 0) {
                this.waypoints[w] = new Array<string>();
              } else if (
                j + 1 == points[i].length &&
                points[i + 1] &&
                points[i + 1].length > 1
              )
                this.waypoints.push(new Array<string>());

              this.waypoints[w].push({
                location: points[i][j],
                stopover: true,
              });
            }
            w++;
          }
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
      if (this.transSer.trans.schedules.routes.isDispersion == true)
      {
        a.origin = this.transSer.trans.address;
        a.destination = this.waypoints[i][this.waypoints[i].length - 1].location;
      } else
      {
        a.origin = this.waypoints[i][0].location;
        a.destination = this.transSer.trans.address;
      }
      this.dir.push(a);
    }
  }

  //פונקציה למ.יקוד בתחנה הנבחרת
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
