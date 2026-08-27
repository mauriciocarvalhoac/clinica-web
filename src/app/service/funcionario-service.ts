import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class FuncionarioService extends AbstractService {

    constructor() {
        super("/funcionarios");
    }

    filtrar(nome: string, cpf: string): Observable<any> {
        var params = new HttpParams();

        if (nome) {
            params = params.set('nome', nome);
        }
        if (cpf) {
            params = params.set('cpf', cpf);
        }
        return this.http.get<any>(this.url + "/filtro", { params });
    }

}
