import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AbstractService {
    public http = inject(HttpClient);
    public url: string = "";

    constructor(uri: String) {
        this.url = environment.apiUrl + uri
    }

    public listar(): Observable<any> {
        return this.http.get<any>(this.url);
    }

    public salvar(obj: any): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }

    public excluir(id: any): Observable<any> {
        return this.http.delete<any>(this.url + "/" + id);
    }

    public editar(obj: any): Observable<any> {
        return this.http.put<any>(this.url + "/" + obj.id, obj);
    }

    public atualizar(id: any, obj: any): Observable<any> {
        return this.http.put<any>(this.url + "/" + id, obj);
    }

    public buscarPorId(id: string): Observable<any> {
        return this.http.get<any>(this.url + "/" + id);
    }
}