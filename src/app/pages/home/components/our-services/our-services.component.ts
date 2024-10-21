import { Component } from '@angular/core';
import { Service } from './types';
import { ServiceCardComponent } from "./components/service-card/service-card.component";
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'our-services',
  standalone: true,
  imports: [ServiceCardComponent, ButtonComponent],
  templateUrl: './our-services.component.html',
  styleUrl: './our-services.component.scss',
})
export class OurServicesComponent {
  protected services: Service[] = [
    {
      name: 'Financial Support',
      image: 'assets/images/financial_support.svg',
    },
    {
      name: 'Training & Workshops',
      image: 'assets/images/training_and_workshops.svg',
    },
    {
      name: 'Farming Equipment',
      image: 'assets/images/farming_equipment.png',
    },
    {
      name: 'On-site Support',
      image: 'assets/images/on_site_support.png',
    },
    {
      name: 'Logistics and Distribution',
      image: 'assets/images/logistics_and_distribution.png',
    },
    {
      name: 'Financial Support',
      image: 'assets/images/financial_support.svg',
    },
    {
      name: 'Training & Workshops',
      image: 'assets/images/training_and_workshops.svg',
    },
    {
      name: 'Farming Equipment',
      image: 'assets/images/farming_equipment.png',
    },
    {
      name: 'On-site Support',
      image: 'assets/images/on_site_support.png',
    },
    {
      name: 'Logistics and Distribution',
      image: 'assets/images/logistics_and_distribution.png',
    },
  ];
}
