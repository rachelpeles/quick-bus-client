import { Component, Inject, NgModule, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Passenger } from 'src/app/Classes/passenger';
import { FamilyService } from 'src/app/Services/Family.service';
import PlaceResult = google.maps.places.PlaceResult;
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete'
import { Router } from '@angular/router';



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
  hide=true;

  constructor(private fb: FormBuilder, private userService: FamilyService, private dialogRef: MatDialogRef<NewPassengerDialogComponent>, private snackBar: MatSnackBar, private router: Router)
  {
    this.passwordsGroup = this.fb.group({
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'verifiedPassword': [null, [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });

    this.newPassengerForm=this.fb.group(
      {
        'userName': [null, Validators.required],
        'type': [null, Validators.required],
        'phone': [null, [Validators.required, Validators.minLength(9)]],
        'address':[ [null, Validators.required]],
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

  cancel()
  {
    this.dialogRef.close();
  }

  save()
  {
    var newUser={
      ...this.newPassengerForm.value,
      type: parseInt(this.newPassengerForm.get('type').value),
      address: [this.newPassengerForm.get('address').value],
      password: this.passwordsGroup.get('password').value
    }
    this.userService.AddFamily(newUser).subscribe(x=>
    {
      console.log(x);
      if(x)
      {
        this.openSnackBar('נרשמת בהצלחה! הנך מועבר לאזור האישי');
        this.cancel();
        this.router.navigate(["/UserMain"]);
      }
    });
  }

  //General snackBar message
  openSnackBar(message: string) {
    this.snackBar.open(message, 'אישור',{
      duration: 2000,
    });
  }

  onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
    this.newPassengerForm.controls.address.setValue(result.formatted_address);
  }
}

