import { Injectable, signal } from '@angular/core';
import { UserDetails } from '../types';


@Injectable({
  providedIn: 'root',
})
export class UserDetailsStateService {
  private userDetails = signal<UserDetails | undefined>(undefined);

  public getUserDetails(): UserDetails | undefined {
    return this.userDetails();
  }

  public updateUserDetails(newDetails: UserDetails): void {
    this.userDetails.update((currDetails) => ({
      ...currDetails,
      ...newDetails,
    }));
  }
}
