import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportation } from 'src/app/Classes/transportation';
import { participant, TransportationService } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-show-and-calc',
  templateUrl: './show-and-calc.component.html',
  styleUrls: ['./show-and-calc.component.css']
})
export class ShowAndCalcComponent implements OnInit {

  trans: Transportation;
  usersAndAddress;
  abc;
  panelOpenState = false;
  
  constructor(private transSer: TransportationService, private router: Router, private activeRoute: ActivatedRoute) { }

  async ngOnInit() {
    // this.activeRoute.params.subscribe(x=>{
    //   this.abc=x;
    //   console.log(this.abc);
    //   });
    this.trans = this.transSer.trans;
    this.usersAndAddress = await this.transSer.gePassengersListDeatails(this.trans);
  }

  calc()
  {
    this.router.navigate(["CalcRoute"]);
  }

}
