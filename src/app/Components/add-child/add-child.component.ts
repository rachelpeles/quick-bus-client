import { Component, OnInit } from '@angular/core';
import { MyService } from '../../Services/my.service';
import { Family } from '../../Classes/Family';

@Component({
  selector: 'app-add-child',
  templateUrl: './add-child.component.html',
  styleUrls: ['./add-child.component.css']
})
export class AddChildComponent implements OnInit {


  constructor(private MySer:MyService) { }

  fam:Family;
  ngOnInit() {
    this.fam=this.MySer.family;
  }

}
