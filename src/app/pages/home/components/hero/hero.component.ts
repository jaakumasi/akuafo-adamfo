import { ButtonComponent } from '@/shared/components/button/button.component';
import { Component } from '@angular/core';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss'
})
export class HeroComponent {

}
