import { ButtonComponent } from '@/shared/components/button/button.component';
import { APP_ROUTES } from '@/shared/constants';
import { UserDetailsStateService } from '@/shared/state/user-details.service';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'cta',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './cta.component.html',
  styleUrl: './cta.component.scss',
})
export class CTAComponent {
  private readonly userDetailsService = inject(UserDetailsStateService);
  private readonly router = inject(Router);

  async handleRequestAssistance() {
    if (!this.userDetailsService.getUserDetails()) {
      await this.router.navigateByUrl(APP_ROUTES.SIGNIN);
    }

    // TODO: request assistance logic
  }
}
