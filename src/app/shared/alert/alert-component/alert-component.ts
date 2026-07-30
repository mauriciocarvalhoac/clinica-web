import { Component, inject } from '@angular/core';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '../alert-service';

@Component({
  selector: 'app-alert-component',
  imports: [NgbAlert, NgbAlertModule],
  standalone: true,
  templateUrl: './alert-component.html',
  styleUrl: './alert-component.scss',
})
export class AlertComponent {
  protected alertService = inject(AlertService);

}
