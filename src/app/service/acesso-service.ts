import { Service } from '@angular/core';
import { AbstractService } from './abstractService';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Service()
export class AcessoService extends AbstractService {

    constructor() {
        super("/usuarios");
    }

}
