import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { RouteForVehicle } from 'src/app/Classes/route-for-vehicle';
import { Station } from 'src/app/Classes/station';
import { EmailService } from 'src/app/Services/email.service';
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
  constructor(private global: GlobalService, private transportationService: TransportationService, private emailSer: EmailService, private userSer: FamilyService) {
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

  save() {
    var recipients: Array<string> = new Array<string>();
    this.thisTrans.schedules.routes.countUsers = this.thisTrans.usersAndAddress.length;
    this.thisTrans.schedules.routes.routeForVehicle = new Array<RouteForVehicle>();
    for (let i = 0; i < this.waypoint.length; i++) {
      var routeForVehicle: RouteForVehicle = new RouteForVehicle();
      routeForVehicle.vehicle = this.global.vehicles[i];
      var stations: Array<Station> = new Array<Station>();
      for (let j = 1; j < this.waypoint[i].length; j++) {
      routeForVehicle.todoLen = this.global.duration[i].distance;
      routeForVehicle.duration = stringify(this.global.duration[i].duration);
        routeForVehicle.station = new Array<Station>();
        var station: Station = new Station();
        station.address = this.waypoint[i][j].location;
        station.oridinalNumber = j;
        this.thisTrans.usersAndAddress.find(x => {
          if (x.address === this.waypoint[i][j].location) {
            station.users.push(x.user);
            this.userSer.getUserById(x.user).toPromise().then(u => recipients.push(u.email));
          }
        });
        stations.push(station);
      }
      routeForVehicle.station = stations;
      this.thisTrans.schedules.routes.routeForVehicle.push(routeForVehicle);
    }
    this.transportationService.updateTransport(this.thisTrans).subscribe(x => {
      console.log(x);
      var isDispresion = this.thisTrans.schedules.routes.isDispresion === true? 'פיזור' : 'איסוף';
      var destOrigin = this.thisTrans.schedules.routes.isDispresion === true? 'כתובת המוצא' : 'כתובת היעד';
      var htmlBody = 
      "<html>        <head><style>h1, p{font-family: system-ui}</style>          <title>ההסעה כבר יוצאת לדרך!!</title>        </head>        <body>          <h3>להלן עדכון לגבי " + this.thisTrans.description + " שנרשמת אליה</h3>          <p>היי,</p>          <p>ההסעה כבר יוצאת לדרך...</p>     <p>לפניך פרטי המסלול:</p> <p>"+ this.thisTrans.description + "</p>   <p>"+isDispresion+"</p> <p>"+destOrigin+":" + this.thisTrans.address + "</p> <p>שעה:"+ this.thisTrans.schedules.departureTime+"</p>      <p>זמן נסיעה משוער:"+ this.thisTrans.schedules.routes.routeForVehicle[0].duration+"</p><p>להצגת המסלול על המפה כנסו לאתר.  http://localhost:4200/UserMain</p>      <p>נסיעה טובה!!</p></p>        </body>      </html>";
      this.emailSer.sendEmailToList(recipients, 'פרטים לגבי ההסעה שנרשמת אליה', htmlBody);
    });
  }
}
