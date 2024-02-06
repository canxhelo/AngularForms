import { Component, Input } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { catchError, finalize } from 'rxjs/operators';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';
import { noop, of } from 'rxjs';
import * as e from 'express';

@Component({
  selector: 'file-upload',
  templateUrl: 'file-upload.component.html',
  styleUrls: ['file-upload.component.scss'],
  providers:[
    {
      provide:NG_VALUE_ACCESSOR,
      multi:true,
      useExisting:FileUploadComponent,
    },
    {
      provide:NG_VALIDATORS,
      multi:true,
      useExisting:FileUploadComponent
    }
  ]
})
export class FileUploadComponent implements ControlValueAccessor,Validator {


  @Input() requiredFileType: string;
  
  fileName: string = '';
  
  fileUploadError: boolean = false;

  uploadProgress: number = 0;

  onChange = (fileName:string) => { };
  onTouched= ()=>{};

  disabled:boolean=false;
  
  fileUploadSucess:boolean=false
  
  onValidatorChange=()=>{};


  constructor(private http: HttpClient) {}

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      console.log(this.fileName);
      const formData = new FormData();
      this.fileUploadError = false;
      formData.append('thumbnail', file);

      this.http
        .post('/api/thumbnail-upload', formData, {
          reportProgress: true,
          observe: 'events',
        })
        .pipe(
          catchError((err) => {
            this.fileUploadError = true;
            return of(err);
          }),
          finalize(()=>{
            this.uploadProgress=null;
          })
        )
        .subscribe((event) => {
          console.log(event);
          if (event.type == HttpEventType.UploadProgress) {
            console.log(event);
            this.uploadProgress = Math.round(
              100 * (event.loaded / event.total)
            );
          }
          else if (event.type==HttpEventType.Response){
            this.fileUploadSucess=true;
            this.onChange(this.fileName);
            this.onValidatorChange();
          }
        });
    }
  }

  onClick(file:HTMLInputElement){
    this.onTouched();
    file.click()
  }

  writeValue(obj: any): void {
    this.fileName=obj 
  }
  registerOnChange(onChange: any) {
    console.log('ON CHANGE',onChange)
    this.onChange=onChange;
  }
  registerOnTouched(onTouched: any) {
    console.log('ON Touched',onTouched)
    this.onTouched=onTouched
  }

  setDisabledState(isDisabled: boolean) {

    this.disabled=this.disabled 
  }
  validate(control: AbstractControl<any, any>): ValidationErrors |null{
    if(this.fileUploadSucess) return null;
    let error:any={
      requiredFileType:this.requiredFileType,
    }

    if(this.fileUploadError){
      error.uploadFailed=true;
    }
    return error;
  }
  registerOnValidatorChange(onValidatorChange: () => void) {
    this.onValidatorChange=onValidatorChange
    
  }
}
