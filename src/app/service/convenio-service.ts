import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class ConvenioService extends AbstractService {

    constructor() {
        super("/convenios");
    }

    filtrar(descricao: any, situacao: any): Observable<any> {
        var params = new HttpParams();

        if (descricao) {
            params = params.set('descricao', descricao);
        }

        if (situacao) {
            params = params.set('situacao', situacao);
        }
        return this.http.get<any>(`${this.url}/filter`, { params })

    }
}
