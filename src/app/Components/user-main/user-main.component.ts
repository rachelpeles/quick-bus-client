import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Transportation } from 'src/app/Classes/transportation';
import { GlobalService } from 'src/app/Services/global.service';
import { TransportationService } from 'src/app/Services/transportation.service';
import { DelTransDialogComponent } from '../del-trans-dialog/del-trans-dialog.component';
import { EditTransDialogComponent } from '../edit-trans-dialog/edit-trans-dialog.component';
import { PreviewDialogComponent } from '../preview-dialog/preview-dialog.component';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.css']
})
export class UserMainComponent implements OnInit {

  dataSource;
  transUser;
  thisUser;
  dataexist=false;
  userWait;
  constructor(private router: Router, private globalService: GlobalService, private titleService: Title, private transService: TransportationService, private changeDetectorRefs: ChangeDetectorRef, private dialog: MatDialog) { }

  displayedColumns=['preview', 'transportName', 'schedule', 'delete', 'edit'];
  ngOnInit() {
    this.globalService.isHome = false;
    this.titleService.setTitle('Quick bus | אזור אישי');
    this.refresh();
    
  }

  refresh()
  {
    this.transUser=new Array<Transportation>();
    this.thisUser = JSON.parse(localStorage.getItem('user'));
    this.transService.getUserTransportation(this.thisUser.userId).then(result=>{
      this.transUser = result;
      this.dataSource= new MatTableDataSource<Transportation>(this.transUser);
      // this.changeDetectorRefs.detectChanges();
      if(this.dataSource._data.value[0])
        this.dataexist = true;
      else
        this.transService.getUserWaitConfirm(this.thisUser.userId).then(result=>this.userWait = result);
    })
  }

  joinTransport()
  {
    this.router.navigate(['/JoinToTransport']);
  }

  createNew()
  {
    const dialogRef = this.dialog.open(EditTransDialogComponent,
      {
        width: '250px',
        data: { actionType: 'add', thisTrans: null, created: true }
      });
    dialogRef.afterClosed().subscribe(x=>{
      this.router.navigate(['/MyCreateTransportation']);
    });
  }

  myTransport()
  {
    this.router.navigate(['/MyCreateTransportation']);
  }

  preview(thisTrans)
  {
    const dialogRef = this.dialog.open(PreviewDialogComponent,
      {
        width: '350px',
        data: {thisTrans: thisTrans, thisUser: this.thisUser}
      });
      dialogRef.afterClosed();
  }
  
  action(action, thisTrans?)
  {
    // this.thisTrans=thisTrans;
    if (action == 'edit') {
      const dialogRef = this.dialog.open(EditTransDialogComponent,
        {
          data: { actionType: action, thisTrans: thisTrans, created: false }
        });
      dialogRef.afterClosed().subscribe(result => {
        this.refresh();
      });
    }

    else if (action == 'delete') {
      const dialogRef = this.dialog.open(DelTransDialogComponent,
        {
          data: { thisTrans: thisTrans, created: false }
        });
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.dataexist=false;
        this.refresh();
      });
    }
  }
}
