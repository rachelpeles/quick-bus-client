import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { FamilyService } from 'src/app/Services/Family.service';
import PlaceResult = google.maps.places.PlaceResult;


export class MyErrorStateMatcher implements ErrorStateMatcher
{
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-new-passenger',
  templateUrl: './new-passenger.component.html',
  styleUrls: ['./new-passenger.component.css']
})
export class NewPassengerComponent implements OnInit {

  newPassengerForm: FormGroup;
  passwordsGroup: FormGroup;
  matcher = new MyErrorStateMatcher();
  hide=true;
  register = true;

  constructor(private fb: FormBuilder, private userService: FamilyService, private snackBar: MatSnackBar, private router: Router)
  {
    this.passwordsGroup = this.fb.group({
      'password': [null, [Validators.required, Validators.minLength(6)]],
      'verifiedPassword': [null, [Validators.required, Validators.minLength(6)]]
    }, { validator: this.checkPasswords });

    this.newPassengerForm=this.fb.group(
      {
        'userName': [null, Validators.required],
        'type': [null, Validators.required],
        'phone': [null, [Validators.required, Validators.minLength(9), Validators.maxLength(10)]],
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
