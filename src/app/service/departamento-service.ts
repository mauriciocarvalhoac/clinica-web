import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable, Subject } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { EnumSituacao } from '../model/enum/enum-situacao';

@Service()
export class DepartamentoService extends AbstractService {
    private notification = new Subject<void>();
    notification$ = this.notification.asObservable();

    constructor() {
        super("/departamentos");
    }

    notificarAtualizacao() {
        this.notification.next()
    }

    filtrar(descricao: string, situacao: string): Observable<any> {
        var params = new HttpParams()
        if (descricao)
            params = params.set('descricao', descricao)

        if (situacao)
            params = params.set('situacao', situacao);

        return this.http.get<any>(`${this.url}/filter`, { params });
    }
}
