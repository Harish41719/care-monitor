import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ageRanges, dynamicForm } from './form.config';
import { IForm } from './form.interface';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit, OnDestroy {

  dynamicFormControls: IForm[] = dynamicForm;
  dynamicFormGroup: FormGroup = this.fb.group({});
  ngUnsubscribe = new Subject<void>();
  constructor(private fb: FormBuilder) {
    let formGroup: any = {};
    for (let eachControl of this.dynamicFormControls) {
      let controlValidators: Validators[] = [];

      if (eachControl.validations) {
        eachControl.validations.forEach(
          (validation) => {
            if (validation.validator === 'required') {
              controlValidators.push(Validators.required);
            }
          }
        );
      }
      formGroup[eachControl.name] = [eachControl.value || '', controlValidators];
    }
    this.dynamicFormGroup = this.fb.group(formGroup);
  }

  ngOnInit(): void {
    this.dynamicFormGroup.get('ageGroup')?.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      this.handleAgeGroupChange(value);
    });

    this.dynamicFormGroup.get('startDate')?.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.handleDateChange();
    });

    this.dynamicFormGroup.get('endDate')?.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe(() => {
      this.handleDateChange();
    });

    this.dynamicFormGroup.get('duration')?.valueChanges.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((value) => {
      this.handleDurationChange(value);
    });
  }

  handleAgeGroupChange(selectedAgeGroup: string) {
    const ageRange = ageRanges.find((each) => each.mapping === selectedAgeGroup);
    this.dynamicFormGroup.get('ageRange')?.setValue(ageRange?.value, { emitEvent: false });
  }

  handleDateChange() {
    const startDate = this.dynamicFormGroup.get('startDate')?.value;
    const endDate = this.dynamicFormGroup.get('endDate')?.value;

    if (!startDate || !endDate) {
      return;
    }

    const timeDifference = endDate.getTime() - startDate.getTime();
    const duration = timeDifference / (1000 * 60 * 60 * 24);
    this.dynamicFormGroup.get('duration')?.setValue(duration, { emitEvent: false });
  }

  handleDurationChange(duration: number) {
    duration = +duration;
    const startDate = this.dynamicFormGroup.get('startDate')?.value;
    if (!startDate) {
      return;
    }
    const date = startDate.getDate();
    const month = startDate.getMonth();
    const year = startDate.getYear();
    const endDate = new Date(year, month, date + duration);
    this.dynamicFormGroup.get('endDate')?.setValue(endDate, { emitEvent: false });
  }

  getErrorMessage(control: any) {
    const formControl = this.dynamicFormGroup.get(control.name);

    if (!formControl) {
      return '';
    }

    for (let validation of control.validations) {
      if (formControl.hasError(validation.name)) {
        return validation.message;
      }
    }
    return '';
  }

  onSubmit() {
    if (!this.dynamicFormGroup.valid) {
      this.dynamicFormGroup.markAllAsTouched();
      return;
    }
    console.log('Form value: ', this.dynamicFormGroup.value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
