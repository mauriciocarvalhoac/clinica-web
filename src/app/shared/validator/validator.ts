import { AbstractControl, ValidationErrors, Validators } from "@angular/forms";

export class Validator {

    static crmRequired(control: AbstractControl): ValidationErrors | null {
        const funcaoControl = control.get('funcao');
        const crmControl = control.get('crm');

        if (!funcaoControl || !crmControl)
            return null;

        const funcao = funcaoControl.value;
        const crm = crmControl.value ? String(crmControl.value).trim() : '';

        if (funcao === 'MED') {
            const estaVazio = crm === '';
            const tamanhoIncorreto = crm.length !== 9;

            if (estaVazio || tamanhoIncorreto) {
                crmControl.setErrors({ crmInvalidoParaMedico: true });
                return { crmInvalidoParaMedico: true };
            }
        }

        if (crmControl.hasError('crmInvalidoParaMedico')) {
            crmControl.setErrors(null);
        }

        return null;
    }

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