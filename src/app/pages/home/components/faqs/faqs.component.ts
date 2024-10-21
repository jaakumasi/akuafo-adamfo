import { Component } from '@angular/core';
import { FAQ } from './types';
import { FaqCardComponent } from './components/faq-card/faq-card.component';

@Component({
  selector: 'faqs',
  standalone: true,
  imports: [FaqCardComponent],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent {
  protected FAQs: FAQ[] = [
    {
      question: 'What services does Akuafo Adamfo offer?',
      answer:
        'We provides a wide range of services tailored to meet the needs of modern farmers, including agricultural consulting, sustainable farming solutions, farm management software, training workshops, market access, financial assistance, and equipment procurement.',
    },
    {
      question: 'How can I request assistance for my farm?',
      answer:
        'To request assistance for your farm, please fill out a request form, providing as much information as possible about your farm, crop, and the specific needs you are seeking. We will then review your request and provide you with the best possible solution.',
    },
    {
      question: 'What kind of training and workshops do you offer?',
      answer:
        'We offer a variety of training and workshops tailored to meet the needs of modern farmers, including farm management, sustainable farming, agricultural economics, and digital farming. Our workshops are designed to help you develop the skills and knowledge you need to succeed in your farm.',
    },
    {
      question: 'Can you help me find markets for my produce?',
      answer:
        "Yes, we can help you find markets for your produce by researching local markets, online marketplaces, and farmers' markets. We can also provide you with farmers' recommendations and tips for maximizing your sales.",
    },
    {
      question: 'How do I apply for financial assistance or grants?',
      answer:
        'To apply for financial assistance or grants, please fill out a form, providing as much information as possible about your farm, crop, and the specific needs you are seeking. We will then review your application and provide you with the best possible solution.',
    },
    {
      question: 'What should I do if I encounter an issue or have a question?',
      answer:
        "If you encounter an issue or have a question, please don't hesitate to reach out to us by email, phone, or visiting our office. We are here to help you and provide you with the best possible solution.",
    },
  ];
}
