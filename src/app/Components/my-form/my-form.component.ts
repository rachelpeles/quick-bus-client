import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators ,FormsModule,NgForm } from '@angular/forms'; 
import { Hoby } from '../../Classes/hoby';


@Component({
  selector: 'app-my-form',
  templateUrl: './my-form.component.html',
  styleUrls: ['./my-form.component.css']
})
export class MyFormComponent implements OnInit {

  ngOnInit(): void {
  }

  regiForm: FormGroup;  
  FirstName:string='';  
  LastName:string='';  
  Address:string='';  
  DOB:Date=null;  
  Gender:string='';  
  Blog:string='';  
  Email:string='';  
  IsAccepted:number=0;  
  
  constructor(private fb: FormBuilder) {   
  
  
    // To initialize FormGroup  
    this.regiForm = fb.group({  
      'FirstName' : [null, Validators.required],  
      'LastName' : [null, Validators.required],  
      'Address' : [null, Validators.compose([Validators.required, Validators.minLength(30), Validators.maxLength(500)])],  
      'DOB' : [null, Validators.required],  
      'Gender':[null, Validators.required],  
      'Blog':[null, Validators.required], 
      'Hoby':[null, Validators.required], 
      'Email':[null, Validators.compose([Validators.required,Validators.email])],  
      'IsAccepted':[null]  
    });  
  
  }  

  animalControl = new FormControl('', [Validators.required]);
  selectFormControl = new FormControl('', Validators.required);
  hobbies: Hoby[] = [
    new Hoby(1, "Learn"),
    new Hoby(2, "Sleep"),
    new Hoby(3, "Eat"),
    new Hoby(4, "Read")
  ];

  get Hoby()
  {
    return this.regiForm.get("Hoby");
  }
  
  // On Change event of Toggle Button  
  onChange(event:any)  
  {  
    if (event.checked == true) {  
      this.IsAccepted = 1;  
    } else {  
      this.IsAccepted = 0;  
    }  
  }  
  
  // Executed When Form Is Submitted  
  onFormSubmit(form:NgForm)  
  {  
    console.log(form);  
  }  
    


}
