import { Component, OnInit, Optional } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { FamilyService } from 'src/app/Services/Family.service';
import { TransportationService } from 'src/app/Services/transportation.service';
import { DelTransDialogComponent } from '../del-trans-dialog/del-trans-dialog.component';
import { EditTransDialogComponent } from '../edit-trans-dialog/edit-trans-dialog.component';
import { WaiteConfirmComponent } from '../waite-confirm/waite-confirm.component';


@Component({
  selector: 'app-my-create-transportation',
  templateUrl: './my-create-transportation.component.html',
  styleUrls: ['./my-create-transportation.component.css']
})
export class MyCreateTransportationComponent implements OnInit {

  dataSource;
  data;
  transUser: Array<Transportation>=new Array<Transportation>();
  transData: Array<Transportation>;
  thisTrans: Transportation;

  constructor(private userSer: FamilyService, private transportser: TransportationService, private dialog: MatDialog) { }


  displayedColumns = ['transportId', 'transportName', 'Participants', 'delete', 'edit', 'calcRoute'];
  ngOnInit() {
    this.transportser.getAlltransport().subscribe(result => {
      this.transData = result;
      this.data = JSON.parse(localStorage.getItem('user'));
      this.data.transportationCreated.forEach(element => {
        this.transUser.push(this.transData.find(x => x.transportationId == element))
      });
      this.dataSource= new MatTableDataSource<Transportation>(this.transUser);
    });
  }

  action(action, thisTrans?) 
  {
    this.thisTrans=thisTrans;
    if (action == 'edit' || action == 'add') {
      const dialogRef = this.dialog.open(EditTransDialogComponent,
        {
          width: '250px',
          data: { actionType: action, thisTrans: thisTrans }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.trans = result;
      });
    }

    else if (action == 'delete') {
      const dialogRef = this.dialog.open(DelTransDialogComponent,
        {
          width: '400px',
          data: { thisTrans: this.thisTrans }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataSource.trans = result;
      });
    }
  }

  waiteConfirm(thisTrans)
  {

    const dialogRef=this.dialog.open(WaiteConfirmComponent,
      {
        width: '500px',
        data:{thisTrans: thisTrans.waitingList}
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log('the dialog was closed');
        this.dataSource=result;
      });
  }
}
