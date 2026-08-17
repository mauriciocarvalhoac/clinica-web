import { AbstractControl, ValidationErrors } from "@angular/forms";

export class Validator {
    static date(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        const data = new Date(value);
        return data ? null : { dataInvalida: true };
    }

    static dateOfBirth(control: AbstractControl): ValidationErrors | null {
        const value = control.value;
        if (!value) {
            return null;
        }
        const dataBorn = new Date(value);
        const today = new Date();

        return dataBorn <= today ? null : { dataInvalida: true };
    }

}