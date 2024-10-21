import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';
import { FAQ } from '../../types';

@Component({
  selector: 'faq-card',
  standalone: true,
  imports: [],
  templateUrl: './faq-card.component.html',
  styleUrl: './faq-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqCardComponent {
  public faq = input.required<FAQ>();

  protected expanded = signal(false);

  protected handleAnswerToggle() {
    this.expanded.update((state) => !state);
  }
}
