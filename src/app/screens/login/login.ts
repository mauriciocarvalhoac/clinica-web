import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../service/login-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login implements OnInit {
  formulario!: FormGroup
  router = inject(Router);

  service = inject(LoginService);

  ngOnInit(): void {

  }

  constructor() {
    this.formulario = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  login() {
    if (this.formulario.invalid) {
      return;
    }
    this.service.login(this.formulario.value.username, this.formulario.value.password).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
      }, (error: any) => {
        console.error('Login failed:', error);
      });
  }
}
