import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from 'src/app/Classes/passenger';
import { FamilyService } from 'src/app/Services/Family.service';
import PlaceResult = google.maps.places.PlaceResult;
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';



export class MyErrorStateMatcher implements ErrorStateMatcher
{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-new-passenger-dialog',
  templateUrl: './new-passenger-dialog.component.html',
  styleUrls: ['./new-passenger-dialog.component.css']
})
@NgModule({
  imports: [MatDialog, MatDialogRef, MatDialogConfig, MatDialogModule]
})
export class NewPassengerDialogComponent implements OnInit {

  newPassengerForm: FormGroup;
  passwordsGroup: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(private fb: FormBuilder, private userService: FamilyService)
  {
    this.passwordsGroup = this.fb.group({
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'verifiedPassword': [null, [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });

    this.newPassengerForm=this.fb.group(
      {
        'userName': [null, Validators.required],
        'phone': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
        'address': [null, Validators.required],
        'email': [null, [Validators.required, Validators.email]]
      });
  }

  checkPasswords(group: FormGroup)
  { 
    let pass = group.controls.password.value;
    let confirmPass = group.controls.verifiedPassword.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  ngOnInit() {
  }

  save()
  {
    var newUser={
      ...this.newPassengerForm.value,
      ...this.passwordsGroup.value
    }
    this.userService.AddFamily(newUser).subscribe(x=>console.log(x));
  }
  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.newPassengerForm.controls.address.setValue(result.name+result.vicinity);
  }
}

