import { AbstractControl, ValidationErrors } from "@angular/forms";
import { EnumFuncao } from "../../model/enum/enum-funcao";

export class Validator {
    static crmRequired(control: AbstractControl): ValidationErrors | null {
        // Como o validador será aplicado no FormGroup, o 'control' é o formulário inteiro
        const funcao = control.get('funcao')?.value;
        const crm = control.get('crm')?.value;

        // Se a função for MED e o CRM estiver vazio, retorna um erro
        if ((!crm || crm.trim() === '')) {
            return { crmInvalido: true };
        }
        if (funcao === 'MED') {
            return { crmInvalido: true };
        }

        // Se estiver tudo correto, retorna null (sem erros)
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