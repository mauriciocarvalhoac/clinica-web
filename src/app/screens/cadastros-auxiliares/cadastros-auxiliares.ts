import { Component, OnInit } from '@angular/core';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AbstractComponent } from '../abstract-component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastros-auxiliares',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgbNavModule],
  templateUrl: './cadastros-auxiliares.html',
  styleUrl: './cadastros-auxiliares.scss',
})
export class CadastrosAuxiliares extends AbstractComponent implements OnInit {
  activeTab = 1;

  constructor() {
    super();

  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      id: [null],
    });
  }


}
