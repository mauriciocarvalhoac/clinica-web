import { inject, Injectable } from "@angular/core";
import { ModalDismissReasons, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal-component";
import { catchError, from, map, Observable, of } from "rxjs";

export enum ModalAction {
    CONFIRM = 'CONFIRM',
    CANCEL = 'CANCEL',
    CLOSE_X = 'CLOSE_X',
    BACKDROP = 'BACKDROP'
}
@Injectable({
    providedIn: 'root'
})
export class ModalService {
    private modalService = inject(NgbModal);

    confirmDelete() {
        return this.confirm(`Deseja realmente apagar o item?`, 'Atenção!')
    }

    confirmSave() {
        return this.confirm(`Deseja realmente salvar o item?`, 'Atenção!')
    }

    private confirm(message?: string, title?: string): Observable<boolean> {

        console.log("Confirm Modal aberto")
        const modalRef = this.modalService.open(ModalComponent,
            { size: 'md', centered: true, keyboard: true, backdrop: true, }
        );

        // Injeta os dados customizados no componente filho
        if (message) modalRef.componentInstance.message = message;
        if (title) modalRef.componentInstance.title = title;

        // Retorna true se confirmado, ou false se cancelado/fechado
        return from(modalRef.result).pipe(
            map((result) => {
                return true;
            }),
            catchError((result) => {
                if (result === ModalDismissReasons.BACKDROP_CLICK || result === ModalDismissReasons.ESC) {
                    return of(false);
                }
                return of(false);
            })
        );
    }
}