import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function date(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        return null;
    };
}