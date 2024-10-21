import { Component } from '@angular/core';
import { ReasonCardComponent } from './components/reason-card/reason-card.component';
import { ReasonToChooseUs } from './typess';

@Component({
  selector: 'why-choose-us',
  standalone: true,
  imports: [ReasonCardComponent],
  templateUrl: './why-choose-us.component.html',
  styleUrl: './why-choose-us.component.scss',
})
export class WhyChooseUsComponent {
  protected reasons: ReasonToChooseUs[] = [
    {
      title: 'Tailored Solutions',
      description:
        "We know that no two farms are the same. That's why we offer customized solutions designed to meet the specific needs of your operation. Whether you’re managing a small family farm or a large commercial enterprise, we have the expertise and tools to support your unique goals.",
      image: 'assets/images/reason_to_choose_us_1.png',
    },
    {
      title: 'Expertise you can rely on',
      description:
        'Our team of agricultural experts brings decades of experience and in-depth knowledge of modern farming practices. We stay ahead of industry trends and advancements, ensuring that you receive the most current and effective solutions',
      image: 'assets/images/reason_to_choose_us_2.png',
    },
    {
      title: 'Comprehensive Support',
      description:
        'From consulting and training to market access and financing assistance, we provide end-to-end support for every aspect of your farming business. We’re here for you at every stage of your journey, ensuring you have the resources you need to thrive',
      image: 'assets/images/reason_to_choose_us_3.png',
    },
  ];
}
