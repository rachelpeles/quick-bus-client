import { Component, OnInit, ViewChild } from '@angular/core';
import { Food } from '../../Classes/food';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material';

@Component({
  selector: 'app-my-table',
  templateUrl: './my-table.component.html',
  styleUrls: ['./my-table.component.css']
})
export class MyTableComponent implements OnInit {

  /*dataSource: Food[] = [
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
 ];*/

  foods: Food[] = [
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
    {name: 'Yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {name: 'Sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {name: 'Eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {name: 'Cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {name: 'Gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4}
 ];
 displayedColumns: string[] = ['name', 'calories', 'fat', 'carbs','protein'];

  

  dataSource = new MatTableDataSource<Food>(this.foods);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  constructor() { }


  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
