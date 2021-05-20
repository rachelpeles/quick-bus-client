import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators ,FormsModule,NgForm } from '@angular/forms';
import { Hoby } from '../../Classes/hoby';


@Component({
  selector: 'app-my-form',
  templateUrl: `./my-form.component.html`,
  template: `<form class="form" [formGroup]="userForm" (ngSubmit)="toConfirm()">
  <div class="p-grid p-fluid">
    <div class="p-col-12 p-md-4">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><i class="pi pi-user"></i></span>
        <input type="text" pInputText placeholder="Username" formControlName="UserName"/>
      </div>
    </div>

    <div class="p-grid">
      <div class="p-col-12">
        <div class="p-inputgroup">
          <span class="p-inputgroup-addon"
            ><i class="pi pi-tags" style="line-height: 1.25"></i
          ></span>
          <span class="p-inputgroup-addon"
            ><i class="pi pi-shopping-cart" style="line-height: 1.25"></i
          ></span>
          <input type="text" pInputText placeholder="Password" />
        </div>
      </div>
    </div>

    <div class="p-grid p-fluid">

      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <input type="text" pInputText placeholder="Address" formControlName="Address"/>
          <button
            type="button"
            pButton
            pRipple
            icon="pi pi-refresh"
            styleClass="p-button-warn"
          ></button>
        </div>
      </div>

      <div class="p-col-12 p-md-4">
        <div class="p-inputgroup">
          <button
            type="button"
            pButton
            pRipple
            icon="pi pi-check"
            styleClass="p-button-success"></button>
          <input type="text" pInputText placeholder="PhonNumber" formControlName="PhoneNumber" />
          <button
            type="button"
            pButton
            pRipple
            icon="pi pi-times"
            styleClass="p-button-danger"
          ></button>
        </div>
      </div>
    </div>

    <p-multiSelect [options]="countries" [(ngModel)]="selectedCountries" defaultLabel="Select a Country" optionLabel="name" class="multiselect-custom">
      <ng-template pTemplate="header">
          Header Content
      </ng-template>
      <ng-template let-value pTemplate="selectedItems">
          <div class="country-item country-item-value" *ngFor="let option of selectedCountries">
              <img src="assets/showcase/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + option.code.toLowerCase()" />
              <div>{{option.name}}</div>
          </div>
          <div *ngIf="!selectedCountries || selectedCountries.length === 0" class="country-placeholder">
              Select Countries
          </div>
      </ng-template>
      <ng-template let-country pTemplate="item">
          <div class="country-item">
              <img src="assets/showcase/images/demo/flag/flag_placeholder.png" [class]="'flag flag-' + country.code.toLowerCase()" />
              <div>{{country.name}}</div>
          </div>
      </ng-template>
      <ng-template pTemplate="footer">
          Footer Content
      </ng-template>
  </p-multiSelect>


  </div>
</form>
`,
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  userForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.userForm = this.fb.group({
      'UserName': [null, Validators.required],
      'Password': [null, [Validators.required, Validators.minLength(6)]],
      'Country': [null, Validators.required],
      'Address': [null, Validators.required],
      'PhonNumber': [null, Validators.required],
    })
  }
  ngOnInit(): void {
  }

}
