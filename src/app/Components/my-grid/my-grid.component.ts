/// <reference types="@types/googlemaps" />
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Title } from "@angular/platform-browser";
import {
  Location,
  Appearance,
} from "@angular-material-extensions/google-maps-autocomplete";
import PlaceResult = google.maps.places.PlaceResult;
import { TransportationService } from "src/app/Services/transportation.service";
import { VehiclesService } from "src/app/Services/vehicles.service";
import { getAttrsForDirectiveMatching } from "@angular/compiler/src/render3/view/util";

@Component({
  selector: "app-my-grid",
  templateUrl: "./my-grid.component.html",
  styleUrls: ["./my-grid.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class MyGridComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private titleService: Title,
    private transSer: TransportationService,
    private vehicleSer: VehiclesService
  ) {
    this.waypoints = new Array<Array<any>>();
  }

  waypoints;

  public lat = 31.723342;
  public lng = 35.013975;

  public origin: any;
  public destination: any;

  async ngOnInit() {
    await this.transSer
      .calcRoute("5f9b395c735978b7d5f36c06")
      .toPromise()
      .then((points) => {
        for (let i = 0, w = 0; i < points.length; i++)
        {
          if (points[i].length > 1)
          {
            for (let j = 0; j < points[i].length; j++)
            {
              if (j == 0)
              {
                this.waypoints[w] = new Array<string>();
              }
              else if (j + 1 == points[i].length && points[i + 1] && points[i + 1].length > 1)
                  this.waypoints.push(new Array<string>());

              this.waypoints[w].push({
                location: points[i][j],
                stopover: true,
              });
            }
            w++;
          }
        }
        // points.forEach(element => {
        //   this.waypoints.push({ location: element, stopover: true });
        // });
      });
    this.getDirection();
  }

  // getDirection() {
  //   this.origin = { lat: 24.799448, lng: 120.979021 };
  //   this.destination = { lat: 24.799524, lng: 120.975017 };

    zoom: Number = 14;
    dir: Array<any> = new Array<any>();
    color = ["red", "blue", "orange", "pink"];

  public getDirection() {
    for (let i = 0; i < this.waypoints.length; i++) {
      var a = {
        // origin: "קדושת לוי 64 ביתר עילית",
        origin: this.waypoints[i][0].location,
        destination: "קדושת לוי 64 ביתר עילית",
        // destination: this.waypoints[i][this.waypoints[i].length - 1].location,
        renderOptions: { polylineOptions: { strokeColor: this.color[i] } },
        waypoints: this.waypoints[i],
        travelMode: google.maps.TravelMode.DRIVING,
        markerOpts: {
          origin: {
            label: 'יציאה',
          },
          destination: {
            label: 'יעד',
          },
        },
        optimizeWaypoints: false
      };
      this.dir.push(a);
    }
  }

  // waypoints: google.maps.DirectionsWaypoint[] = [];
  // async insertaddress() {
  //   await this.transSer.calcRoute("5f9b395c735978b7d5f36c06").toPromise().then((points) => {
  //     points.forEach(element => {
  //       this.waypoints.push({ location: element, stopover: true });
  //     });
  //   });

  //   return this.waypoints;
  // }

  // Location within a string
  // this.origin = 'Taipei Main Station';
  // this.destination = 'Taiwan Presidential Office';
  // }
  // ngOnInit() {

  //   this.titleService.setTitle('Home | @angular-material-extensions/google-maps-autocomplete');

  //   this.zoom = 10;
  //   this.latitude = 52.520008;
  //   this.longitude = 13.404954;

  //   this.setCurrentPosition();
  //   this.getDirection();
  // }

  // getDirection() {
  //   this.origin = "דברי חיים 6 ביתר עילית";
  //   this.destination = "קדושת לוי 64 ביתר עילית";

  //   // Location within a string
  //   // this.origin = 'Taipei Main Station';
  //   // this.destination = 'Taiwan Presidential Office';
  // }

  // onSubmit(contactForm: NgForm) {
  //   if (contactForm.valid) {
  //     const email = contactForm.value;
  //     const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  //     this.http.post('https://formspree.io/f/xqkgbvkw',
  //       { name: email.name, replyto: email.email, message: email.messages },
  //       { 'headers': headers }).subscribe(
  //         response => {
  //           console.log(response);
  //         }
  //       );
  //   }
  // }

  // public appearance = Appearance;
  // public zoom: number;
  // public latitude: number;
  // public longitude: number;
  // public selectedAddress: PlaceResult;

  // private setCurrentPosition() {
  //   if ('geolocation' in navigator) {
  //     navigator.geolocation.getCurrentPosition((position) => {
  //       this.latitude = position.coords.latitude;
  //       this.longitude = position.coords.longitude;
  //       this.zoom = 12;
  //     });
  //   }
  // }

  // onAutocompleteSelected(result: PlaceResult) {
  //   console.log('onAutocompleteSelected: ', result);

  // }

  // onLocationSelected(location: Location) {
  //   console.log('onLocationSelected: ', location);
  //   this.latitude = location.latitude;
  //   this.longitude = location.longitude;
  // }
}
