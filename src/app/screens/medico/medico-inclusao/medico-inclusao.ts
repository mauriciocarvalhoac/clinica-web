import { ChangeDetectionStrategy, Component, effect, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MedicoService } from '../../../service/medico-service';
import { NgxMaskDirective } from 'ngx-mask';
import { AbstractComponent, CrudEnum } from '../../abstract-component';

@Component({
  selector: 'app-medico-inclusao',
  imports: [RouterLink, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './medico-inclusao.html',
  styleUrl: './medico-inclusao.scss',
})
export class MedicoInclusao extends AbstractComponent implements OnInit {
  formulario!: FormGroup;
  service = inject(MedicoService);
  route = inject(ActivatedRoute);
  router = inject(Router)

  constructor(private fb: FormBuilder) {
    super();
    this.isCRUD = "C";
  }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      id: [null],
      nome: [null, [Validators.required, Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.maxLength(100)]],
      cpf: [null, [Validators.required]],
      celular: [null, [Validators.required]],
      telefone: [null],
    });

    var id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isCRUD = "R";
      this.service.buscarPorId(id).subscribe((medico: any) => {
        this.formulario.patchValue(medico);
        this.formulario.disable();
      });
    }
  }

  salvar() {
    if (this.formulario.invalid) {
      return;
    }
    if (this.formulario.value.id) {
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/medico-listagem']);
      });
    } else {
      this.service.salvar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/medico-listagem']);
      });
    }
  }

  limpar() {
    this.formulario.reset();
  }

  cancelar() {
    this.service.buscarPorId(this.formulario.value.id).subscribe((medico: any) => {
      this.formulario.patchValue(medico);
      this.formulario.disable();
      this.isCRUD = "R";
    });
  }

  habilitarCampos() {
    this.isCRUD = "U";
    this.formulario.enable();
  }
}
