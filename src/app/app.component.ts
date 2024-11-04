import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthenticationService } from './shared/services/auth/authentication.service';
import { ToastComponent } from './shared/components/toast/toast.component';
import { UserDetailsStateService } from './shared/state/user-details.service';
import { LocalStorageService } from './shared/services/local-storage.service';
import { LOCAL_STORAGE_KEYS } from './shared/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, NgClass, ToastComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthenticationService],
})
export class AppComponent implements OnInit {
  private readonly userDetailsStateService = inject(UserDetailsStateService);
  private readonly localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    this.initializeStateWithLocalStorageData();
  }

  private initializeStateWithLocalStorageData() {
    const user = this.localStorageService.getLocalItem(LOCAL_STORAGE_KEYS.USER);

    console.log(user)

    if (!user) return;

    this.userDetailsStateService.updateUserDetails(user);
  }
}
