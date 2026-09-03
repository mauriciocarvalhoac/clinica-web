import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class ConvenioService extends AbstractService {

    constructor() {
        super("/convenios");
    }

    filtrar(nomeFantasia: any, situacao: any): Observable<any> {
        var params = new HttpParams();

        if (nomeFantasia) {
            params = params.set('nomeFantasia', nomeFantasia);
        }

        if (situacao) {
            params = params.set('situacao', situacao);
        }
        return this.http.get<any>(`${this.url}/filter`, { params })

    }
}
