import { Component, input, output } from '@angular/core';

type ButtonVariant = 'primary';

type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  public text = input.required<string>();
  public variant = input<ButtonVariant>('primary');
  public size = input<ButtonSize>('small');
  public clickEvent = output<null>();
  public isDisabled = input<boolean>(false);
  public isLoading = input<boolean>(false);
}
