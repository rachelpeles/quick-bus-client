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

}
