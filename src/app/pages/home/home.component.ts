import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { WhyChooseUsComponent } from './components/why-choose-us/why-choose-us.component';
import { FaqsComponent } from './components/faqs/faqs.component';
import { CTAComponent } from './components/cta/cta.component';
import { ContactsComponent } from './components/contacts/contacts.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    OurServicesComponent,
    WhyChooseUsComponent,
    FaqsComponent,
    CTAComponent,
    ContactsComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
