import { ButtonComponent } from '@/shared/components/button/button.component';
import { APP_ROUTES } from '@/shared/constants';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-404',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
  templateUrl: './404.component.html',
  styleUrl: './404.component.scss',
})
export class PageNotFoundComponent {
  signinRoute = APP_ROUTES.SIGNIN;
}
