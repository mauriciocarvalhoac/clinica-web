import { Component, inject, Input } from "@angular/core";
import { NgbActiveModal, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalAction } from "./modal-service";


@Component({
  selector: 'app-modal-component',
  standalone: true,
  imports: [],
  templateUrl: './modal-component.html',
  styleUrl: './modal-component.scss',
})
export class ModalComponent {
  modalService = inject(NgbModal);

  @Input() title!: string;
  @Input() message!: string;

  protected readonly ModalAction = ModalAction;

  constructor(public activeModal: NgbActiveModal) { }
}