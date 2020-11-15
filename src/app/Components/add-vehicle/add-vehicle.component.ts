import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { VehiclesService } from 'src/app/Services/vehicles.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {

  addVehicle:FormGroup;
  constructor(private httpSer: VehiclesService) { }

  ngOnInit() {
  }
  add() {
    this.httpSer.add(this.addVehicle);
  }
}
