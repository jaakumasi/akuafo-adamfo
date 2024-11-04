import {
  Component,
  computed,
  inject,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { AuthTypeService } from '../../services/auth/auth-type.service';
import { ButtonComponent } from '../button/button.component';
import { NavigationEnd, Router } from '@angular/router';
import { APP_ROUTES } from '@/shared/constants';
import { UserDetailsStateService } from '@/shared/state/user-details.service';
import { Subscription } from 'rxjs';

const flaggedRoutes = [APP_ROUTES.EMAIL_VERIFICATION];

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly authTypeService = inject(AuthTypeService);
  private readonly router = inject(Router);
  private readonly userDetailsService = inject(UserDetailsStateService);

  protected authType = computed(() => this.authTypeService.getAuthType());

  protected user = computed(() => this.userDetailsService.getUserDetails());

  protected hideAuthButton = signal(false);

  private routerSubscription?: Subscription;

  ngOnInit(): void {
    this.subToNavigationEvents();
  }

  ngOnDestroy(): void {
    this.routerSubscription?.unsubscribe();
  }

  private subToNavigationEvents() {
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) return;

      const urlRegex = new RegExp(event.urlAfterRedirects);

      const match = flaggedRoutes.find((route) => urlRegex.test(route));

      if (match) this.hideAuthButton.set(true);
      else this.hideAuthButton.set(false);
    });
  }

  async handleAuthTypeChange() {
    await this.router.navigateByUrl(
      this.authType() === 'signin' ? APP_ROUTES.SIGNUP : APP_ROUTES.SIGNIN
    );
  }
}
