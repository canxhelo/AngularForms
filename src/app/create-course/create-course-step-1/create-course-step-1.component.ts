import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { courseTitleValidator } from '../../validators/course-title.validator';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';

interface CourseCategory {
  code: string;
  description: string;
}

@Component({
  selector: 'create-course-step-1',
  templateUrl: './create-course-step-1.component.html',
  styleUrls: ['./create-course-step-1.component.scss'],
})
export class CreateCourseStep1Component implements OnInit {
  form = this.fb.group({
    title: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(60),
        ],
        asyncValidators: [courseTitleValidator(this.courses)], // as can be seen here is used an angular async validator
        updateOn: 'blur', // is required as property so it want call the observable each time
      },
    ],
    releaseDate: [
      new Date(),
      {
        validators: [Validators.required],
      },
    ],
    category:['BEGINNER',Validators.required],
    downloadAllowed: [false, Validators.requiredTrue],
    longDescription: [
      '',
      {
        validators: [Validators.required, Validators.minLength(12)],
      },
    ],
    // adress:[null,Validators.required]
  });
  courseCategoires$: Observable<CourseCategory[]>;

  constructor(private fb: FormBuilder, private courses: CoursesService) {}
  ngOnInit() {
    const draft=localStorage.getItem('Step_1')
    if(draft){
      this.form.setValue(JSON.parse(draft))
    }

    this.courseCategoires$ = this.courses.findCourseCategories();
    this.form.valueChanges.pipe(
      filter(()=>this.form.valid)
    ).subscribe( val=>{
      localStorage.setItem('Step_1',JSON.stringify(val))
    })
  }
  get courseTitle() {
    return this.form.controls['title'];
  }
}
