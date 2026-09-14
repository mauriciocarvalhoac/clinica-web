import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class DepartamentoService extends AbstractService {

    constructor() {
        super("/departamentos");
    }

}
