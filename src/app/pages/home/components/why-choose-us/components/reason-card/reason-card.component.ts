import { Component, input } from '@angular/core';
import { ReasonToChooseUs } from '../../typess';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'reason-card',
  standalone: true,
  imports: [NgStyle],
  templateUrl: './reason-card.component.html',
  styleUrl: './reason-card.component.scss',
})
export class ReasonCardComponent {
  public reason = input.required<ReasonToChooseUs>();
  public flexFlow = input<'row' | 'row-reverse'>('row');
}
