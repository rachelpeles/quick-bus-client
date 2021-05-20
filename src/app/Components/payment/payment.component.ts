import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  local=JSON.parse(localStorage.getItem("transToShow")).description;

  constructor() { }

  ngOnInit() {
  }

  byPassengers()
  {
    var list = JSON.parse(localStorage.getItem('dir'));
    for (let i = 0; i < list.length; i++)
    {
      for (let j = 0; j < list[i].length; j++)
      {


      }

    }
  }
}
