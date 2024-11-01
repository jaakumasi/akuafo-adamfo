import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthenticationService } from './shared/services/auth/authentication.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    HttpClientModule,
    NgClass
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthenticationService],
})
export class AppComponent{
    list =[]
}
