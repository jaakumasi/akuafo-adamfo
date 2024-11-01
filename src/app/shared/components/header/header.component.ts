import { Component, computed, inject } from '@angular/core';
import { AuthTypeService } from '../../services/auth-type.service';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../constants';
import { UserDetailsService } from '@/shared/state/user-details.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authTypeService = inject(AuthTypeService);
  private readonly router = inject(Router);
  private readonly userDetailsService = inject(UserDetailsService);

  protected authType = computed(() => this.authTypeService.getAuthType());

  protected user = computed(() => this.userDetailsService.getUserDetails())

  async handleAuthTypeChange() {
    await this.router.navigateByUrl(
      this.authType() === 'signin' ? APP_ROUTES.SIGNUP : APP_ROUTES.SIGNIN
    );
  }
}
