import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transportation } from 'src/app/Classes/transportation';
import { participant, TransportationService } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-show-and-calc',
  templateUrl: './show-and-calc.component.html',
  styleUrls: ['./show-and-calc.component.css']
})
export class ShowAndCalcComponent implements OnInit {
  // @Input()
  // showOrEdit:boolean;
  trans: Transportation;
  usersAndAddress;
  abc;
  panelOpenState = false;
  showOrEdit:string;
  constructor(private transSer: TransportationService, private router: Router, private activeRoute: ActivatedRoute) { 
    this.showOrEdit = router.url;
  }

  async ngOnInit() {
    // this.activeRoute.params.subscribe(x=>{
    //   this.abc=x;
    //   console.log(this.abc);
    //   });
    // this.trans = this.transSer.trans;
    this.trans=JSON.parse(localStorage.getItem("transToShow"));
    this.abc = this.trans.schedules.departureTime;
    this.usersAndAddress = await this.transSer.gePassengersListDeatails(this.trans);
  }

  calc()
  {  
    if(this.showOrEdit=="/ShowCalc")
      this.router.navigate(["CalcRoute"]);
    else
      this.router.navigate(["ShowCalcRoute"]);
  }

}
