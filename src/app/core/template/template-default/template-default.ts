import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template-default',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './template-default.html',
  styleUrl: './template-default.scss',
})
export class TemplateDefault implements OnInit {
  isInvisibleMenu: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  logout() {
    console.log("Saindo da aplicação..");
  }

  toggleMenu() {
    this.isInvisibleMenu = !this.isInvisibleMenu;
  }
}
