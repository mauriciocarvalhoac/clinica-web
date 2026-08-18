import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class PacienteService extends AbstractService {

    constructor() {
        super("/pacientes");
    }

    listar(): Observable<any> {
        return this.http.get<any>(this.url);
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

    salvar(obj: any): Observable<any> {
        return this.http.post<any>(this.url, obj);
    }

    // editar(obj: any): Observable<any> {
    //     return this.http.put<any>(this.url + "/" + obj.id, obj);
    // }

    // excluir(id: any): Observable<any> {
    //     return this.http.delete<any>(this.url + "/" + id);
    // }

    // buscarPorId(id: string): Observable<any> {
    //     return this.http.get<any>(this.url + "/" + id);
    // }

}
