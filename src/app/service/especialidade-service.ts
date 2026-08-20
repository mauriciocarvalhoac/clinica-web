import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class EspecialidadeService extends AbstractService {

    constructor() {
        super("/especialidades");
    }

    filtrar(descricao: string): Observable<any> {
        var params = new HttpParams();

        if (descricao) {
            params = params.set('descricao', descricao);
        }
        return this.http.get<any>(this.url + "/filtro", { params });
    }

}
