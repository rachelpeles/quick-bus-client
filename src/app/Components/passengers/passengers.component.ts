import { Component, OnInit, ViewChild } from '@angular/core';
import { PassengerTransportationService } from 'src/app/Services/passenger-transportation.service';
import { Transportation } from 'src/app/Classes/transportation';
import { MatTable, MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { DataSource } from '@angular/cdk/table';

@Component({
  selector: 'app-passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.css']
})
export class PassengersComponent implements OnInit {
  //@ViewChild(MatTable) table: MatTable<any>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  
  isable=false;
  
  constructor(private httpSer: PassengerTransportationService) { }

  dataSource;
  transport: Transportation[];
  displayedColumns=['transportationId', 'DestinationStreetId'];

  ngOnInit() {
    this.httpSer.getAllPassengertransport().subscribe((data)=>
    {
      console.log("getAllPassengertransport data:")
      console.log(data);
      this.transport=data;
      this.dataSource=new MatTableDataSource<Transportation>(this.transport);
      
    },
    (err)=>
    {
      alert(err);
      console.log(err);
    }
    );
    this.dataSource = new MatTableDataSource<Transportation>(this.transport);
  }

  disable()
  {
    this.isable=true;
  }
  
  delete()
  {
    this.httpSer.delete(this.ngOnInit);
  }
  
}
