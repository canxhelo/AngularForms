import { FormGroup, ValidatorFn, Validators } from '@angular/forms';

export function createPromoRangeValidator(): ValidatorFn {
  return (form: FormGroup): Validators | null => {
    const start: Date = form.get('promoStartAt').value;
    const end: Date = form.get('promoEndAt').value;

    const isRangeValid = end?.getTime() - start?.getTime();

    if(start&&end)return isRangeValid ? null : { promoPeriod: true };
    
    return null;
    
  };
}
