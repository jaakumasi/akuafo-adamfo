import { Component, input } from '@angular/core';
import { Service } from '../../types';

@Component({
  selector: 'service-card',
  standalone: true,
  imports: [],
  templateUrl: './service-card.component.html',
  styleUrl: './service-card.component.scss',
})
export class ServiceCardComponent {
  public service = input.required<Service>();
}
