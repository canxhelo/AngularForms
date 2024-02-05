import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { createPasswordStrengthValidator } from '../validators/paswordStrength.validator';

@Component({
  selector: 'login',
  templateUrl: './login-reactive.component.html',
  styleUrls: ['./login-reactive.component.css']
})
export class LoginReactiveComponent implements OnInit {

  // form = new FormGroup({
  //   email: new FormControl('',{validators:[Validators.required,Validators.email]}),
  //   password: new FormControl('',
  //   {
  //     validators:[Validators.required,Validators.minLength(8),createPasswordStrengthValidator()],
  //     updateOn:'blur'}),
  // })
    form=this.fb.group({
      //to declare an nonNullable controller 
      email:this.fb.nonNullable.control('',
      {
        validators:[Validators.required, Validators.email],
        updateOn:'blur'
          
      }),
      password:['',[Validators.required,Validators.minLength(8),createPasswordStrengthValidator()] ],
    })


  constructor(
    private fb:FormBuilder,
    // or another case for nonNullable form controlls
    // fb: NonNullableFormBuilder
  ) 
  {

  }
 


  ngOnInit() {
  }

  login(){
    console.log(this.form)
    this.form.patchValue({email:''})
  }


  get email(){
    return this.form.controls['email']
  }
  get password(){
    return this.form.controls['password']
  }


}
