import { ButtonComponent } from '@/shared/components/button/button.component';
import { APP_ROUTES } from '@/shared/constants';
import { UserDetailsStateService } from '@/shared/state/user-details.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'hero',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  private readonly userDetailsService = inject(UserDetailsStateService);
  private readonly router = inject(Router);

  async handleRequestAssistance() {
    if (!this.userDetailsService.getUserDetails()) {
      await this.router.navigateByUrl(APP_ROUTES.SIGNIN);
    }

    // TODO: request assistance logic
  }
}
