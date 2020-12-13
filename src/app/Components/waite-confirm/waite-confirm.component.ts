import { SelectionModel } from '@angular/cdk/collections';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { Transportation } from 'src/app/Classes/transportation';
import { TransportationService, wait } from 'src/app/Services/transportation.service';

@Component({
  selector: 'app-waite-confirm',
  templateUrl: './waite-confirm.component.html',
  styleUrls: ['./waite-confirm.component.css']
})
export class WaiteConfirmComponent implements OnInit {

  // dataSource;
  selection = new SelectionModel<wait>(true, []);
  list: wait[] = {} as wait[];
  a: wait[];
  completed: false;

  constructor(public dialogRef: MatDialogRef<WaiteConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private transSer: TransportationService) { }

  // displayedColumns=["select", "passengerName", "address"];
  async ngOnInit() {
    // this.dataSource=new MatTableDataSource<wait>(this.transSer.getWaiteListDeatails(this.data));
    // console.log(this.dataSource);
    var b = await this.transSer.getWaiteListDeatails(this.data);
    for (let i = 0; i < b.length; i++) {

      this.list[i].id = b[i].id;
      this.list[i].address = b[i].address;
      this.list[i].name = b[i].name;
    }

    // this.list=this.transSer.getWaiteListDeatails(this.data);
    this.transSer.getWaiteListDeatails(this.data)
    this.list.forEach(element => {
      this.a.push(element);
      console.log(this.a);
    });

  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.list.length ? this.list.length : null;
    return numSelected === numRows;
  }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.list.forEach(row => this.selection.select(row));
  }

  // /** The label for the checkbox on the passed row */
  checkboxLabel(row?: wait): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  allComplete: boolean = false;

  // updateAllComplete() {
  //   this.allComplete = this.list != null// && this.task.subtasks.every(t => t.completed);
  // }

}