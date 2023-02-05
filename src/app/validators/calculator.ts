import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
import { CalculatorComponentValue } from './../model/calculatorComponentValue';

export const calculatorValidator = (): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const { value, cards }: CalculatorComponentValue = control.value;
    if (!value || value < 0) {
      return { calculatorValueInvalid: true };
    } else if (cards.length === 0) {
      return { calculatorCardsInvalid: true };
    }
    return null;
  };
};
