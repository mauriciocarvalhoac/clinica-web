import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class CepService extends AbstractService {

    constructor() {
        super("/ceps");
    }

    consultarCep(value: any): Observable<any> {
        return this.http.get<any>(`${this.url}/${value}`);
    }
}
