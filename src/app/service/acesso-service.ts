import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class AcessoService extends AbstractService {

    constructor() {
        super("/usuarios");
    }

    salvarUsuario(id: any, obj: any): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }

    atualizarUsuario(id: any, obj: any): Observable<any> {
        return this.http.put<any>(`${this.url}/${id}`, obj);
    }

    filtrar(username: any): Observable<any[]> {
        var params = new HttpParams();

        if (username) {
            params = params.set("username", username);
        }

        return this.http.get<any[]>(this.url + "/filter", { params });
    }

}
