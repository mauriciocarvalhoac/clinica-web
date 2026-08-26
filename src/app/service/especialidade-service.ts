import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class EspecialidadeService extends AbstractService {

    constructor() {
        super("/especialidades");
    }

    filtrar(descricao: string, situacao: string): Observable<any> {
        var params = new HttpParams();

        if (descricao) {
            console.log("passou em Descrição")
            params = params.set('descricao', descricao);
        }
        if (situacao != null && situacao != "null") {
            console.log("passou em Situação: " + situacao)
            params = params.set('situacao', situacao);
        }
        return this.http.get<any>(this.url + "/filtro", { params });
    }

}
