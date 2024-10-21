import { Injectable, signal } from '@angular/core';

interface UserDetails {
  name: string;
  email: string;
  profilePicUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserDetailsService {
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
