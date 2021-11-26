import { ChangeDetectorRef, Component, OnInit, Optional, ViewChild } from '@angular/core';
import { MatDialog, MatTable, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Family } from 'src/app/Classes/Family';
import { Transportation } from 'src/app/Classes/transportation';
import { FamilyService } from 'src/app/Services/Family.service';
import { MyService } from 'src/app/Services/my.service';
import { participant, TransportationService } from 'src/app/Services/transportation.service';
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
  transUser;
  transData: Array<Transportation>;
  thisTrans: Transportation;
  dataexist=false;
  isWait = true;
  dataForShow;
  abc="abc";
  constructor(private userSer: FamilyService, private transportser: TransportationService, private dialog: MatDialog, private changeDetectorRefs: ChangeDetectorRef, private router: Router, private meSer: MyService, private titleService: Title) { }


  displayedColumns = ['transportId', 'transportName', 'transportAddress', 'Participants', 'delete', 'edit', 'calcRoute'];
  ngOnInit() {
    this.titleService.setTitle('Quick bus | הסעות שיצרתי');
    this.refresh();
  }

  action(action, thisTrans?)
  {
    this.thisTrans=thisTrans;
    if (action == 'edit' || action == 'add') {
      const dialogRef = this.dialog.open(EditTransDialogComponent,
        {
          width: '250px',
          data: { actionType: action, thisTrans: thisTrans, created: true }
        });
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
      });
    }

    else if (action == 'delete') {
      const dialogRef = this.dialog.open(DelTransDialogComponent,
        {
          width: '400px',
          data: { thisTrans: this.thisTrans, created: true }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataexist=false;
        this.isWait = true;
        this.refresh();
      });
    }
  }

  waiteConfirm(thisTrans)
  {
    const dialogRef=this.dialog.open(WaiteConfirmComponent,
      {
        width: '500px',
        data:{waitingList: thisTrans.waitingList, thisTrans: thisTrans}
      });
      dialogRef.afterClosed().subscribe(result=>{
        console.log('the dialog was closed');
        this.dataSource.trans=result;
      });
  }

  async refresh()
  {
    this.data = JSON.parse(localStorage.getItem('user'));
    this.transUser=new Array<Transportation>();
    await this.transportser.getUserTransportationCreated(this.data.transportationCreated).then(x=>{
      this.transUser = x;
      this.dataSource= new MatTableDataSource<Transportation>(this.transUser);
      this.changeDetectorRefs.detectChanges();
      if(this.dataSource.data.values.length > 0 || this.dataSource._data.value.length > 0)
        this.dataexist = true;
        this.isWait = false;
    });
    // this.transportser.getAlltransport().subscribe(result => {
    //   this.transData = result;
      // this.data = JSON.parse(localStorage.getItem('user'));
    //   this.data.transportationCreated.forEach(element => {
    //     if(this.transData.find(x => x.transportationId == element))
    //       this.transUser.push(this.transData.find(x => x.transportationId == element))
    //   });
      
    // });
  }


  show(thisTrans)
  {
    localStorage.setItem('transToShow', JSON.stringify(thisTrans));
    this.transportser.trans=thisTrans;
    this.router.navigate(["/ShowCalc"]);
  }
}
