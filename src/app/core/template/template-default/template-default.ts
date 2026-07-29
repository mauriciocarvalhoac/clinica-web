import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { LoginService } from '../../../service/login-service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-template-default',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, NgbDropdownModule],
  templateUrl: './template-default.html',
  styleUrl: './template-default.scss',
})
export class TemplateDefault implements OnInit {
  isInvisibleMenu: boolean = true;
  service = inject(LoginService);
  router = inject(Router);

  constructor() {
  }

  ngOnInit(): void {
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }

  toggleMenu() {
    this.isInvisibleMenu = !this.isInvisibleMenu;
  }
}
