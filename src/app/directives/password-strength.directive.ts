import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrengthValidator } from "../validators/paswordStrength.validator";

@Directive({
    selector:'[passwordStrength]',
    providers:[{provide:NG_VALIDATORS,useExisting:PasswordStrengthDirective,
    multi:true}]
    //to bee seen in details
})
export class PasswordStrengthDirective implements Validator{

validate(control: AbstractControl<any, any>): ValidationErrors |null{
   return createPasswordStrengthValidator()(control); 
   //the first () are to create the function of validation and the second () are to pass the controll object to the validator function
    
}
}