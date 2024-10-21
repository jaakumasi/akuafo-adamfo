import { ButtonComponent } from '@/shared/components/button/button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'cta',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss'
})
export class CTAComponent {

}
