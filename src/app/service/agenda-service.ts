import { Service } from "@angular/core";
import { AbstractService } from "./abstractService";

@Service()
export class AgendaService extends AbstractService {
    constructor() {
        super("/agendas");
    }

    
}